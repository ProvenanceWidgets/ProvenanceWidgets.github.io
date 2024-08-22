import React from 'react';
import AbstractSelectionComponent from './AbstractSelectionComponent';

export default function ProvenanceCheckbox (props) {
    return(
        <AbstractSelectionComponent {...props} selector="web-provenance-checkbox" />
    )
}