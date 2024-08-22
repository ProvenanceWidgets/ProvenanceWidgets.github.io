import React from 'react';
import type { InputtextComponent } from 'provenance-widgets';
import type { NgWebComponent } from './types';
import StateView from './StateView';

type InputtextComponentProps = Pick<InputtextComponent, 'id' | 'value' | 'visualize' | 'freeze' | 'provenance' | 'provenanceChange' | 'valueChange'>;

export default function ProvenanceInputText(props: InputtextComponentProps) {
    const ref = React.useRef<HTMLDivElement>(null);

    const [value, setValue] = React.useState<any>(null);
    const [provenance, setProvenance] = React.useState<any>({});

    React.useEffect(() => {
        if (ref?.current) {
            const inputText = document.createElement("web-provenance-inputtext") as NgWebComponent<InputtextComponent>;

            inputText.id = props.id;
            inputText.value = props.value;
            inputText.visualize = props.visualize;
            inputText.freeze = props.freeze;

            inputText.addEventListener('valueChange' as any, (event) => {
                setValue(event.detail);
            });

            inputText.addEventListener('provenanceChange' as any, (event) => {
                setProvenance(event.detail);
            });

            ref.current.appendChild(inputText);
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col col--12" ref={ref}></div>
            </div>
            <StateView selectedAlias='value' {...{ selected: value, provenance }} />
        </div>
    )
}