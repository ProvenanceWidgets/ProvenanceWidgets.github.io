import React from 'react';
import type { SliderComponent } from 'provenance-widgets';
import type { NgWebComponent } from './types';
import StateView from './StateView';

type SliderComponentProps = Pick<SliderComponent, 'id' | 'mode' | 'value' | 'highValue' | 'options' | 'provenance' | 'provenanceChange' | 'selectedChange' | 'visualize' | 'freeze'>;

export default function ProvenanceSlider (props: SliderComponentProps) {

  const ref = React.useRef<HTMLDivElement>(null);

  const [selected, setSelected] = React.useState<any>(null);
  const [provenance, setProvenance] = React.useState<any>({});

  React.useEffect(() => {
    if (ref?.current) {

      const slider = document.createElement("web-provenance-slider") as NgWebComponent<SliderComponent>;

      slider.id = props.id;
      slider.value = props.value;
      slider.highValue = props.highValue;
      slider.options = props.options;
      slider.visualize = props.visualize;
      slider.freeze = props.freeze;

      slider.addEventListener('selectedChange' as any, (event) => {
        setSelected(event.detail);
      });

      slider.addEventListener('provenanceChange' as any, (event) => {
        setProvenance(event.detail);
      });

      ref.current.appendChild(slider);
    }
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