import React, { useEffect } from "react";
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live";
import {
  CheckboxGroup,
  ProvenanceButton,
  SingleSelectDropdown,
  useProvenance,
} from "provenance-widgets";

const primitiveText = value => {
  if (value === undefined) return "undefined";
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

function StateView({ selected, strategy }) {
  return (
    <div className="state-view">
      <div className="state-panel">
        <JsonTree label="provenance" value={asPwProvenance(strategy)} />
      </div>
      <div className="state-panel">
        <JsonTree label="selected" value={selected} />
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
};

const getExample = () => {
  const name = new URLSearchParams(window.location.search)
    .get("example");
  return examples[name] ?? examples.checkbox;
};

const postHeight = () => {
  const height = Math.ceil(document.documentElement.scrollHeight);
  window.parent.postMessage(
    { source: "sw-live-playground", height },
    window.location.origin,
  );
};

export default function App() {
  const example = getExample();

  useEffect(() => {
    const observer = new ResizeObserver(postHeight);
    observer.observe(document.documentElement);
    observer.observe(document.body);
    postHeight();
    window.addEventListener("load", postHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", postHeight);
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
