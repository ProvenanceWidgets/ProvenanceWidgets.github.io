import React from "react";
import { 
  AbstractSelectionComponent,
  ProvenanceInputText, 
  ProvenanceSlider, 
  ProvenanceCheckbox, 
  ProvenanceDropdown, 
  ProvenanceMultiselect, 
  ProvenanceRadiobutton, 
} from "@site/src/components/lib";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  AbstractSelectionComponent,
  ProvenanceCheckbox,
  ProvenanceDropdown,
  ProvenanceInputText,
  ProvenanceMultiselect,
  ProvenanceRadiobutton,
  ProvenanceSlider,
};

export default ReactLiveScope;
