interface SWAPIPropertyTableRow {
    name: string;
    type: string;
    default: string;
    required: boolean;
    description: React.ReactNode;
}

interface SWAPIPropertyTableProps {
    rows: SWAPIPropertyTableRow[];
    provenanceType: string;
}

export default function SWAPIPropertyTable(props: SWAPIPropertyTableProps) {
    return (
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
                    <td><code>—</code></td>
                    <td>Yes</td>
                    <td>
                        Unique identifier for the element. Used by ProvenanceWidgets for
                        internal state management and visualizations.
                    </td>
                </tr>
                {props.rows.map(row => (
                    <tr key={row.name}>
                        <td>{row.name}</td>
                        <td><code>{row.type}</code></td>
                        <td><code>{row.default}</code></td>
                        <td>{row.required ? "Yes" : "No"}</td>
                        <td>{row.description}</td>
                    </tr>
                ))}
                <tr>
                    <td>freeze</td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>No</td>
                    <td>
                        Whether to freeze the provenance. If <code>true</code>,
                        the widget will not record any new provenance, and
                        interactions will not create or update provenance
                        visualizations.
                    </td>
                </tr>
                <tr>
                    <td>visualize</td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>No</td>
                    <td>Whether to visualize the provenance.</td>
                </tr>
                <tr>
                    <td>provenance</td>
                    <td><code>{props.provenanceType}</code></td>
                    <td><code>undefined</code></td>
                    <td>No</td>
                    <td>
                        The serialized provenance recorded by the widget. Use
                        this property to persist, restore, modify, or
                        reconstruct the widget&apos;s interaction history.
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
