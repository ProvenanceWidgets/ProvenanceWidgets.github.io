import BrowserOnly from '@docusaurus/BrowserOnly';
// import ReactJson, { ReactJsonViewProps } from '@microlink/react-json-view'
import type { ReactJsonViewProps } from '@microlink/react-json-view'

interface StateViewProps {
    selected: any;
    provenance: any;
    selectedAlias?: string;
}

const reactJsonProps: Omit<ReactJsonViewProps, 'src'> = {
    collapsed: 1,
    displayArrayKey: false,
}

export default function StateView(props: StateViewProps) {
    return (
        <div className="row margin-top--md">
            <BrowserOnly>
                {() => {
                    const ReactJson = require('@microlink/react-json-view').default;
                    return <>
                        <div className="col col--6">
                            <ReactJson src={props.provenance} name="provenance" {...reactJsonProps} />
                        </div>
                        {
                            props.selected !== null &&
                            <div className="col col--6">
                                {
                                    typeof props.selected === 'string' ?
                                        <code style={{ color: "black" }}>"{props.selectedAlias || "selected"}": "{props.selected}"</code> :
                                        <ReactJson src={props.selected} name={props.selectedAlias || "selected"} {...reactJsonProps} />
                                }
                            </div>
                        }
                    </>
                }}
            </BrowserOnly>
        </div>
    )
}