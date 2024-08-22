interface APIEventTableRow {
    name: string;
    type: string | { link: string, text: string };
    description: string;
}

interface APIEventTableProps {
    rows: APIEventTableRow[];
}

export default function APIEventTable(props: APIEventTableProps) {
    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th><code>EventEmitter{'<T>'}</code></th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {props.rows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>
                            {typeof row.type === 'string' ? <code>{row.type}</code> : <a href={row.type.link} target="_blank" rel="noreferrer"><code>{row.type.text}</code></a>}
                        </td>
                        <td>{row.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}