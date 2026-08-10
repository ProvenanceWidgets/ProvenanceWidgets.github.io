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
} from "provenance-widgets";

const primitiveText = value => {
  if (value === undefined) return "undefined";
  return JSON.stringify(value);
};

function JsonTree({ label, value, depth = 0 }) {
  const [open, setOpen] = React.useState(depth === 0);
  const isObject = value !== null && typeof value === "object";

  if (!isObject) {
    return (
      <div className="json-row">
        <span className="json-key">{JSON.stringify(label)}</span>
        <span>: </span>
        <span className={`json-value json-value--${typeof value}`}>
          {primitiveText(value)}
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

function StateView({ selected, provenance }) {
  return (
    <div className="state-view">
      <div className="state-panel">
        <JsonTree label="selected" value={selected} />
      </div>
      <div className="state-panel">
        <p className="state-panel__description">
          Latest serializable snapshot emitted by <code>onProvenanceChange</code>.
        </p>
        <JsonTree
          label="serialized provenance"
          value={provenance ?? {}}
        />
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
  const [selected, setSelected] = React.useState(
    checkbox.props.selected ??
      checkbox.props.defaultSelected ??
      [],
  );
  const [provenance, setProvenance] = React.useState(null);

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

  const handleProvenanceChange = (nextProvenance, meta) => {
    setProvenance(nextProvenance);
    callUnique(
      [
        checkbox.props.onProvenanceChange,
        checkbox.props.provenanceChange,
      ],
      nextProvenance,
      meta,
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
        onProvenanceChange: handleProvenanceChange,
      })}
      <StateView selected={selected} provenance={provenance} />
    </div>
  );
}

const checkboxCode = `<CheckboxPlayground>
  <CheckboxGroup
    id="jsx-provenance-checkbox"
    name="jsx-provenance-checkbox"
    data={[
      { label: 'Chicken', value: 'Chicken' },
      { label: 'Beef', value: 'Beef' },
      { label: 'Lamb', value: 'Lamb' }
    ]}
    selected={['Chicken', 'Beef']}
    freeze={false}
    visualize={true}
    onProvenanceChange={console.log}
    onSelectedChange={console.log}
  />
</CheckboxPlayground>`;

const examples = {
  checkbox: {
    code: checkboxCode,
    scope: {
      React,
      CheckboxGroup,
      CheckboxPlayground,
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
