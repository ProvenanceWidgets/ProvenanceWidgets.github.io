import React from 'react';
import AbstractSelectionComponent from './AbstractSelectionComponent';

export default function ProvenanceDropdown (props) {
    return(
        <AbstractSelectionComponent {...props} selector="web-provenance-dropdown" />
    )
}