import React from 'react';
import type { MultiselectComponent } from 'provenance-widgets';
import type { NgWebComponent } from './types';
import StateView from './StateView';
import useIsBrowser from '@docusaurus/useIsBrowser';

type AbstractProps = Pick<MultiselectComponent, 'provenance' | 'provenanceChange' | 'selectedChange' | 'visualize' | 'freeze' | 'selected'>;

interface SelectionProps extends AbstractProps {
    data?: any;
    options?: any;
    selector: string;
    selected: any;
    optionLabel?: string;
    dataKey?: string;
}

export default function AbstractSelectionComponent (props: SelectionProps) {
    
    const isBrowser = useIsBrowser();
    if (!isBrowser) return <div>loading...</div>

    const ref = React.useRef<HTMLDivElement>(null);
    const [selected, setSelected] = React.useState<any>(null);
    const [provenance, setProvenance] = React.useState<any>({});

    React.useEffect(() => {
        if (!ref?.current) return;

        const el = document.createElement(props.selector) as NgWebComponent<any>;

        if (props.data) 
            el.data = props.data;

        if (props.options)
            el.options = props.options;

        if (props.optionLabel)
            el.optionLabel = props.optionLabel;

        if (props.dataKey)
            el.dataKey = props.dataKey;

        el.selected = props.selected;
        el.visualize = props.visualize;
        el.freeze = props.freeze;

        el.addEventListener('selectedChange' as any, (event) => {
            setSelected(event.detail);
            el.selected = event.detail;
        });

        el.addEventListener('provenanceChange' as any, (event) => {
            setProvenance(event.detail);
        });

        ref.current.appendChild(el);
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col col--12" ref={ref}></div>
            </div>
            <StateView {...{ selected, provenance }} />
        </div>
    )
}