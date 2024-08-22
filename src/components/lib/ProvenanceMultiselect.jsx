import React from 'react';
import AbstractSelectionComponent from './AbstractSelectionComponent';

export default function ProvenanceMultiselect (props) {
    return(
        <AbstractSelectionComponent {...props} selector="web-provenance-multiselect" />
    )
}