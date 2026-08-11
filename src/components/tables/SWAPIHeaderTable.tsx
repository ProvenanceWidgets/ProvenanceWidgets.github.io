interface LinkedComponent {
    link: string;
    text: string;
}

interface SWAPIHeaderTableProps {
    builtWith: LinkedComponent;
    reactComponent: string;
    webComponentTag: string;
}

export default function SWAPIHeaderTable(props: SWAPIHeaderTableProps) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Built with</td>
                    <td>
                        <a
                            href={props.builtWith.link}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {props.builtWith.text}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>React Component</td>
                    <td><code>{props.reactComponent}</code></td>
                </tr>
                <tr>
                    <td>Web Component Tag</td>
                    <td><code>{props.webComponentTag}</code></td>
                </tr>
            </tbody>
        </table>
    );
}
