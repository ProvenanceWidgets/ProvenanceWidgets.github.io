interface SWAPIEventTableRow {
    name: string;
    type: string;
    description: React.ReactNode;
}

interface SWAPIEventTableProps {
    rows: SWAPIEventTableRow[];
}

export default function SWAPIEventTable(props: SWAPIEventTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {props.rows.map(row => (
                    <tr key={row.name}>
                        <td>{row.name}</td>
                        <td><code>{row.type}</code></td>
                        <td>{row.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
