interface APIHeaderTableProps {
    extends?: {
        link: string;
        text: string;
    }
    selector: string;
}

export default function APIHeaderTable(props: APIHeaderTableProps) {
    return(
        <table>
            <tbody>
                {
                    !!props.extends &&
                    <tr>
                        <td>Extends</td>
                        <td>
                            <a href={props.extends.link} target="_blank" rel="noreferrer">
                                {props.extends.text}
                            </a>
                        </td>
                    </tr>
                }
                <tr>
                    <td>Angular Selector</td>
                    <td><code>{props.selector}</code></td>
                </tr>
                <tr>
                    <td>Web Component Tag</td>
                    <td><code>web-{props.selector}</code></td>
                </tr>
            </tbody>
        </table>
    )
}