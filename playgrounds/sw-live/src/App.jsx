import React, { useEffect } from "react";
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live";
import {
  CheckboxGroup,
  InputText,
  MultiSelectDropdown,
  ProvenanceButton,
  RadioGroup,
  Rangeslider,
  SingleSelectDropdown,
  useProvenance,
} from "provenance-widgets";

const primitiveText = value => {
  if (value === undefined) return "undefined";
  if (typeof value === "number" && !Number.isFinite(value)) {
    return String(value);
  }
  return JSON.stringify(value);
};

function JsonTree({ label, value, depth = 0 }) {
  const [open, setOpen] = React.useState(depth === 0);
  const isDate = value instanceof Date;
  const isObject = value !== null && typeof value === "object" && !isDate;

  if (!isObject) {
    return (
      <div className="json-row">
        <span className="json-key">{JSON.stringify(label)}</span>
        <span>: </span>
        <span
          className={`json-value json-value--${
            isDate ? "date" : typeof value
          }`}
        >
          {isDate
            ? `date ${value.toLocaleString("en-US")}`
            : primitiveText(value)}
        </span>
      </div>
    );
  }

  const entries = Object.entries(value);
  const collectionLabel = Array.isArray(value)
    ? `[ ${entries.length} items ]`
    : `{ ${entries.length} items }`;

  return (
    <details
      className="json-branch"
      open={open}
      onToggle={event => setOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="json-key">{JSON.stringify(label)}</span>
        <span>: </span>
        <span className="json-count">{collectionLabel}</span>
      </summary>
      <div className="json-children">
        {entries.map(([key, child]) => (
          <JsonTree
            key={key}
            label={key}
            value={child}
            depth={depth + 1}
          />
        ))}
      </div>
    </details>
  );
}

const asDate = value => {
  if (value === undefined || value === null) return undefined;
  return value instanceof Date ? value : new Date(value);
};

const asPwEvent = event => {
  if (!event) return undefined;
  return {
    date: asDate(event.time ?? event.date),
    index: event.index,
  };
};

const asPwSelectionValue = value => {
  if (value === undefined || value === null) return [];
  if (value instanceof Set) return Array.from(value);
  return Array.isArray(value) ? value : [value];
};

// Present SW's runtime SelectionProvenance using the seven fields exposed by
// PW 1.0. This is a display adapter; it does not replace SW's runtime model or
// its schema v2 serialization contract.
const asPwProvenance = strategy => {
  const dataByOption = {};

  if (strategy?.detailedData instanceof Map) {
    strategy.detailedData.forEach((records, option) => {
      dataByOption[String(option)] = records.map(record => ({
        ...(record.select ? { select: asPwEvent(record.select) } : {}),
        ...(record.unselect ? { unselect: asPwEvent(record.unselect) } : {}),
      }));
    });
  }

  const [minTime, oldMaxTime, maxTime] =
    strategy?.domain?.get("time") ?? [];
  const [, events = 0] = strategy?.domain?.get("index") ?? [];

  return {
    dataByOption,
    minTime: asDate(minTime),
    oldMaxTime: asDate(oldMaxTime),
    maxTime: asDate(maxTime),
    events,
    hasUserInteracted: strategy?.hasUserInteracted === true,
    selections: (strategy?.temporalData ?? []).map(({ value, time }) => ({
      value: asPwSelectionValue(value),
      timestamp: asDate(time),
    })),
  };
};

// Present SW's TextProvenance using PW 1.0's InputTextProvenance fields.
// Empty baseline records are omitted because PW 1.0 did not add an initial
// record when the input started with an empty string.
const asPwInputTextProvenance = strategy => {
  const records = strategy?.detailedData instanceof Map
    ? Array.from(strategy.detailedData.values())
        .filter(record => (
          record.kind !== "baseline" || record.value !== ""
        ))
        .sort((left, right) => (
          (left.index ?? 0) - (right.index ?? 0)
        ))
    : [];
  const data = records.map(record => ({
    value: String(record.value ?? ""),
    timestamp: asDate(record.time),
  }));
  const dictionary = data.reduce((result, entry, index) => {
    result[entry.value] = {
      count: (result[entry.value]?.count ?? 0) + 1,
      timestamp: entry.timestamp,
      maxIndex: index,
    };
    return result;
  }, Object.create(null));
  const timestamps = data.map(entry => entry.timestamp);
  const intervals = timestamps.slice(1).map((timestamp, index) => (
    timestamp.getTime() - timestamps[index].getTime()
  ));

  return {
    data,
    dictionary,
    minTime: timestamps[0],
    oldMaxTime:
      timestamps.length > 1
        ? timestamps[timestamps.length - 2]
        : timestamps[0],
    maxTime: timestamps[timestamps.length - 1],
    minMsBetweenInteractions:
      intervals.length > 0 ? Math.min(...intervals) : Infinity,
  };
};

// Present SW's RangedProvenance using PW 1.0's SliderProvenance fields.
// The adapter affects only the state inspector shown in this documentation.
const asPwSliderProvenance = (strategy, range) => {
  const records = strategy?.detailedData instanceof Map
    ? Array.from(strategy.detailedData.values()).sort(
        (left, right) => (left.index ?? 0) - (right.index ?? 0),
      )
    : [];
  const data = records.map(record => ({
    value: Array.isArray(record.value)
      ? [...record.value]
      : record.value,
    timestamp: asDate(record.time),
  }));
  const [minTime, oldMaxTime, maxTime] =
    strategy?.domain?.get("time") ?? [];
  const [, maxFrequency = 0] =
    strategy?.domain?.get("count") ?? [];
  const initialTime = data[0]?.timestamp;
  const buckets = {};

  if (strategy?.aggregateData instanceof Map) {
    strategy.aggregateData.forEach((record, lowValue) => {
      buckets[String(lowValue)] = {
        date:
          record.index === -1
            ? initialTime
            : asDate(record.time),
        count: record.count,
        highValue: record.highValue,
        ...(record.index >= 1
          ? { maxIndex: record.index - 1 }
          : {}),
      };
    });
  }

  return {
    data,
    minTime: asDate(minTime),
    oldMaxTime: asDate(oldMaxTime),
    maxTime: asDate(maxTime),
    maxFrequency,
    buckets,
    value: range[0],
    highValue: range[1],
  };
};

function StateView({
  selected,
  strategy,
  provenance,
  selectedLabel = "selected",
}) {
  return (
    <div className="state-view">
      <div className="state-panel">
        <JsonTree
          label="provenance"
          value={provenance ?? asPwProvenance(strategy)}
        />
      </div>
      <div className="state-panel">
        <JsonTree label={selectedLabel} value={selected} />
      </div>
    </div>
  );
}

const callUnique = (callbacks, ...args) => {
  new Set(callbacks.filter(Boolean)).forEach(callback => callback(...args));
};

// Documentation-only adapter. Its distinct name avoids shadowing the public
// CheckboxGroup export used inside the preview.
function CheckboxPlayground({ children }) {
  const checkbox = React.Children.only(children);
  const [registeredComponents] = useProvenance();
  const [selected, setSelected] = React.useState(
    checkbox.props.selected ??
      checkbox.props.defaultSelected ??
      [],
  );
  const strategy = registeredComponents.get(checkbox.props.id);

  const handleSelectedChange = (nextSelected, event) => {
    setSelected(nextSelected);
    callUnique(
      [
        checkbox.props.onSelectedChange,
        checkbox.props.selectedChange,
      ],
      nextSelected,
      event,
    );
  };

  return (
    <div className="checkbox-example">
      <div className="checkbox-example__heading">
        <ProvenanceButton target={checkbox.props.id} />
        <span>Checkbox Group</span>
      </div>
      {React.cloneElement(checkbox, {
        selected,
        onSelectedChange: handleSelectedChange,
        selectedChange: undefined,
        onChange: undefined,
      })}
      <StateView selected={selected} strategy={strategy} />
    </div>
  );
}

const getInitialRadioSelection = props => {
  for (const key of [
    "selected",
    "value",
    "defaultSelected",
    "defaultValue",
  ]) {
    if (
      Object.prototype.hasOwnProperty.call(props, key) &&
      props[key] !== undefined
    ) {
      return props[key];
    }
  }
  return null;
};

// Documentation-only adapter that keeps the scalar group value controlled
// and presents the same provenance/selection state panels as PW 1.0.
function RadioButtonPlayground({ children }) {
  const radioGroup = React.Children.only(children);
  const [registeredComponents] = useProvenance();
  const [selected, setSelected] = React.useState(() =>
    getInitialRadioSelection(radioGroup.props),
  );
  const strategy = registeredComponents.get(radioGroup.props.id);

  const handleSelectedChange = (nextSelected, event) => {
    setSelected(nextSelected);
    callUnique(
      [
        radioGroup.props.onSelectedChange,
        radioGroup.props.selectedChange,
        radioGroup.props.onChange,
      ],
      nextSelected,
      event,
    );
  };

  return (
    <div className="radio-button-example">
      <div className="radio-button-example__provenance">
        <ProvenanceButton target={radioGroup.props.id} />
      </div>
      {React.cloneElement(radioGroup, {
        selected,
        onSelectedChange: handleSelectedChange,
        selectedChange: undefined,
        onChange: undefined,
      })}
      <StateView selected={selected} strategy={strategy} />
    </div>
  );
}

const getInitialDropdownSelection = props => {
  for (const key of [
    "selected",
    "value",
    "defaultSelected",
    "defaultValue",
  ]) {
    if (
      Object.prototype.hasOwnProperty.call(props, key) &&
      props[key] !== undefined
    ) {
      return props[key];
    }
  }
  return null;
};

// Documentation-only adapter that keeps the live example controlled and
// presents the same provenance/selection state panels as PW 1.0.
function DropdownPlayground({ children }) {
  const dropdown = React.Children.only(children);
  const [registeredComponents] = useProvenance();
  const [selected, setSelected] = React.useState(() =>
    getInitialDropdownSelection(dropdown.props),
  );
  const strategy = registeredComponents.get(dropdown.props.id);

  const handleSelectedChange = (nextSelected, event) => {
    setSelected(nextSelected);
    callUnique(
      [
        dropdown.props.onSelectedChange,
        dropdown.props.selectedChange,
        dropdown.props.onChange,
      ],
      nextSelected,
      event,
    );
  };

  return (
    <div className="dropdown-example">
      <div className="dropdown-example__control">
        <ProvenanceButton target={dropdown.props.id} />
        {React.cloneElement(dropdown, {
          selected,
          onSelectedChange: handleSelectedChange,
          selectedChange: undefined,
          onChange: undefined,
        })}
      </div>
      <StateView selected={selected} strategy={strategy} />
    </div>
  );
}

// Documentation-only adapter that keeps the complete option selection
// controlled and presents the same provenance/selection panels as PW 1.0.
function MultiselectPlayground({ children }) {
  const multiselect = React.Children.only(children);
  const [registeredComponents] = useProvenance();
  const [selected, setSelected] = React.useState(
    multiselect.props.selected ??
      multiselect.props.value ??
      multiselect.props.defaultSelected ??
      multiselect.props.defaultValue ??
      [],
  );
  const strategy = registeredComponents.get(multiselect.props.id);

  const handleSelectedChange = (nextSelected, event) => {
    setSelected(nextSelected);
    callUnique(
      [
        multiselect.props.onSelectedChange,
        multiselect.props.selectedChange,
        multiselect.props.onChange,
      ],
      nextSelected,
      event,
    );
  };

  return (
    <div className="multiselect-example">
      <div className="multiselect-example__control">
        <ProvenanceButton target={multiselect.props.id} />
        {React.cloneElement(multiselect, {
          selected,
          onSelectedChange: handleSelectedChange,
          selectedChange: undefined,
          onChange: undefined,
        })}
      </div>
      <StateView selected={selected} strategy={strategy} />
    </div>
  );
}

// Documentation-only adapter that keeps the committed value visible and
// presents PW 1.0's InputTextProvenance shape beside the real SW control.
function InputTextPlayground({ children }) {
  const inputText = React.Children.only(children);
  const [registeredComponents] = useProvenance();
  const [value, setValue] = React.useState(
    inputText.props.value ?? inputText.props.defaultValue ?? "",
  );
  const strategy = registeredComponents.get(inputText.props.id);

  const handleValueChange = (nextValue, event) => {
    setValue(nextValue);
    callUnique(
      [
        inputText.props.onChange,
        inputText.props.onInputChange,
        inputText.props.onValueChange,
        inputText.props.valueChange,
      ],
      nextValue,
      event,
    );
  };

  return (
    <div className="input-text-example">
      <div className="input-text-example__control">
        <ProvenanceButton target={inputText.props.id} />
        {React.cloneElement(inputText, {
          value,
          onChange: undefined,
          onInputChange: undefined,
          onValueChange: handleValueChange,
          valueChange: undefined,
        })}
      </div>
      <StateView
        selected={value}
        selectedLabel="value"
        provenance={asPwInputTextProvenance(strategy)}
      />
    </div>
  );
}

const getInitialSliderRange = props => {
  const options = props.options ?? {};
  const min = Number(props.min ?? options.floor ?? 0);
  const max = Number(props.max ?? options.ceil ?? 100);

  if (Array.isArray(props.value) && props.value.length === 2) {
    return [...props.value];
  }
  if (props.value !== undefined && props.highValue !== undefined) {
    return [Number(props.value), Number(props.highValue)];
  }
  if (
    Array.isArray(props.defaultValue) &&
    props.defaultValue.length === 2
  ) {
    return [...props.defaultValue];
  }
  if (
    props.defaultValue !== undefined &&
    props.defaultHighValue !== undefined
  ) {
    return [
      Number(props.defaultValue),
      Number(props.defaultHighValue),
    ];
  }
  return [min, max];
};

// Documentation-only adapter for PW's range-slider example. It keeps the
// React tuple controlled while displaying PW 1.0 SliderProvenance fields.
function SliderPlayground({ children }) {
  const slider = React.Children.only(children);
  const [registeredComponents] = useProvenance();
  const [range, setRange] = React.useState(() =>
    getInitialSliderRange(slider.props),
  );
  const strategy = registeredComponents.get(slider.props.id);

  const handleSelectedChange = (nextRange, event) => {
    setRange([...nextRange]);
    callUnique(
      [
        slider.props.onSelectedChange,
        slider.props.selectedChange,
        slider.props.onChange,
      ],
      nextRange,
      event,
    );
  };

  return (
    <div className="slider-example">
      <div className="slider-example__control">
        <ProvenanceButton target={slider.props.id} />
        {React.cloneElement(slider, {
          value: range[0],
          highValue: range[1],
          onChange: undefined,
          onSelectedChange: handleSelectedChange,
          selectedChange: undefined,
        })}
      </div>
      <StateView
        selected={{ value: range[0], highValue: range[1] }}
        strategy={strategy}
        provenance={asPwSliderProvenance(strategy, range)}
      />
    </div>
  );
}

const checkboxCode = `<CheckboxPlayground>
  <CheckboxGroup
    id="jsx-provenance-checkbox"
    name="jsx-provenance-checkbox"
    data={[
      { label: 'New York', value: 'New York' },
      { label: 'Rome', value: 'Rome' },
      { label: 'London', value: 'London' },
      { label: 'Istanbul', value: 'Istanbul' },
      { label: 'Paris', value: 'Paris' }
    ]}
    selected={['New York', 'Rome']}
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onSelectedChange={console.log}
  />
</CheckboxPlayground>`;

const dropdownCode = `<DropdownPlayground>
  <SingleSelectDropdown
    id="jsx-provenance-dropdown"
    name="jsx-provenance-dropdown"
    options={[
      { label: 'New York', value: 'New York' },
      { label: 'Rome', value: 'Rome' },
      { label: 'London', value: 'London' },
      { label: 'Istanbul', value: 'Istanbul' },
      { label: 'Paris', value: 'Paris' }
    ]}
    selected={{ label: 'New York', value: 'New York' }}
    optionLabel="label"
    dataKey="value"
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onSelectedChange={console.log}
  />
</DropdownPlayground>`;

const inputTextCode = `<InputTextPlayground>
  <InputText
    id="jsx-provenance-inputtext"
    value=""
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onValueChange={console.log}
  />
</InputTextPlayground>`;

const multiselectCode = `<MultiselectPlayground>
  <MultiSelectDropdown
    id="jsx-provenance-multiselect"
    name="jsx-provenance-multiselect"
    options={[
      { label: 'New York', value: 'New York' },
      { label: 'Rome', value: 'Rome' },
      { label: 'London', value: 'London' },
      { label: 'Istanbul', value: 'Istanbul' },
      { label: 'Paris', value: 'Paris' }
    ]}
    selected={[{ label: 'New York', value: 'New York' }]}
    optionLabel="label"
    dataKey="value"
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onSelectedChange={console.log}
  />
</MultiselectPlayground>`;

const radioButtonCode = `<RadioButtonPlayground>
  <RadioGroup
    id="jsx-provenance-radiobutton"
    name="jsx-provenance-radiobutton"
    data={[
      { label: 'New York', value: 'New York' },
      { label: 'Rome', value: 'Rome' },
      { label: 'London', value: 'London' },
      { label: 'Istanbul', value: 'Istanbul' },
      { label: 'Paris', value: 'Paris' }
    ]}
    selected="New York"
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onSelectedChange={console.log}
  />
</RadioButtonPlayground>`;

const sliderCode = `<SliderPlayground>
  <Rangeslider
    id="jsx-provenance-slider"
    value={50}
    highValue={150}
    options={{
      floor: 0,
      ceil: 250,
      showTicks: true,
      tickStep: 25
    }}
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onSelectedChange={console.log}
  />
</SliderPlayground>`;

const examples = {
  checkbox: {
    code: checkboxCode,
    scope: {
      React,
      CheckboxGroup,
      CheckboxPlayground,
    },
  },
  dropdown: {
    code: dropdownCode,
    scope: {
      React,
      DropdownPlayground,
      SingleSelectDropdown,
    },
  },
  inputtext: {
    code: inputTextCode,
    scope: {
      React,
      InputText,
      InputTextPlayground,
    },
  },
  multiselect: {
    code: multiselectCode,
    scope: {
      React,
      MultiSelectDropdown,
      MultiselectPlayground,
    },
  },
  radiobutton: {
    code: radioButtonCode,
    scope: {
      React,
      RadioButtonPlayground,
      RadioGroup,
    },
  },
  slider: {
    code: sliderCode,
    scope: {
      React,
      Rangeslider,
      SliderPlayground,
    },
  },
};

const getExample = () => {
  const name = new URLSearchParams(window.location.search)
    .get("example");
  return examples[name] ?? examples.checkbox;
};

const postHeight = () => {
  const playground = document.querySelector(".live-playground");
  const rootTop = document.documentElement.getBoundingClientRect().top;
  let visualBottom = playground?.getBoundingClientRect().bottom ?? 0;

  // Provenance charts and suggestion panels are positioned absolutely, so
  // they do not contribute to scrollHeight. Include visible out-of-flow
  // elements when sizing the parent iframe, while ignoring fixed tooltips.
  document.body.querySelectorAll("*").forEach(element => {
    const style = window.getComputedStyle(element);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.position === "fixed"
    ) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    visualBottom = Math.max(visualBottom, rect.bottom);
  });

  const height = Math.ceil(visualBottom - rootTop + 1);
  window.parent.postMessage(
    { source: "sw-live-playground", height },
    window.location.origin,
  );
};

export default function App() {
  const example = getExample();

  useEffect(() => {
    let frameId;
    const schedulePostHeight = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(postHeight);
    };
    const scheduleAfterOverlayUpdate = () => {
      schedulePostHeight();
      window.requestAnimationFrame(schedulePostHeight);
    };
    const resizeObserver = new ResizeObserver(schedulePostHeight);
    const mutationObserver = new MutationObserver(schedulePostHeight);

    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    schedulePostHeight();
    window.addEventListener("load", schedulePostHeight);
    window.addEventListener(
      "provenance-dropdown-toggle",
      scheduleAfterOverlayUpdate,
    );
    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("load", schedulePostHeight);
      window.removeEventListener(
        "provenance-dropdown-toggle",
        scheduleAfterOverlayUpdate,
      );
    };
  }, []);

  return (
    <main className="live-playground">
      <LiveProvider
        code={example.code}
        scope={example.scope}
      >
        <section className="playground-section">
          <h2>LIVE EDITOR</h2>
          <LiveEditor className="live-editor" />
          <LiveError className="live-error" />
        </section>
        <section className="playground-section">
          <h2>RESULT</h2>
          <div className="live-preview">
            <LivePreview />
          </div>
        </section>
      </LiveProvider>
    </main>
  );
}
