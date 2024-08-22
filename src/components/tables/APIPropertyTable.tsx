interface APIPropertyTableRow {
    name: string;
    type: string;
    default: string;
    required: boolean;
    description: string | React.ReactNode;
}

interface APIPropertyTableProps {
    rows: APIPropertyTableRow[];
    provenance: {
        link: string;
        text: string;
    }
}

export default function APIPropertyTable(props: APIPropertyTableProps) {
    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Required</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td><code>string</code></td>
                    <td><code>""</code></td>
                    <td>Yes</td>
                    <td>Unique identifier for the element. Used by ProvenanceWidgets for internal state management and visualizations.</td>
                </tr>
                {props.rows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td><code>{row.type}</code></td>
                        <td>{!!row.default && <code>{row.default}</code>}</td>
                        <td>{row.required ? 'Yes' : 'No'}</td>
                        <td>{row.description}</td>
                    </tr>
                ))}
                <tr>
                    <td>freeze</td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>No</td>
                    <td>Whether to freeze the provenance. If <code>true</code>, the widget will not record any provenance, and interactions will not create/update any visualizations. <i>NOTE: The widget does not update when the property is changed.</i></td>
                </tr>
                <tr>
                    <td>visualize</td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>No</td>
                    <td>Whether to visualize the provenance. <i>NOTE: The widget does not update when the property is changed.</i></td>
                </tr>
                <tr>
                    <td>provenance</td>
                    <td><a href={props.provenance.link} target="_blank" rel="noreferrer"><code>{props.provenance.text}</code></a></td>
                    <td><code>undefined</code></td>
                    <td>No</td>
                    <td>
                        The provenance of interactions recorded by the widget. Use this property to persist, restore, modify, or reconstruct the provenance of interactions for the widget. To override the provenance, <code>revalidate</code> must be set to <code>true</code>. Two-way binding is supported.
                    </td>
                </tr>
            </tbody>
        </table>
    )
}