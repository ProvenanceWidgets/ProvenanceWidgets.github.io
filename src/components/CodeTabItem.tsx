import TabItem from '@theme/TabItem';
import Avatar from './Avatar';

type Framework = 'angular' | 'webcomponent'
type Language = 'html' | 'ts'

interface CodeTabItemProps {
    component: string;
    framework: Framework;
    language: Language;
    children: any;
}

const sources: Record<Framework, string> = {
    angular: 'https://cdn.simpleicons.org/angular/red',
    webcomponent: 'https://cdn.simpleicons.org/webcomponentsdotorg'
}

export default function CodeTabItem({ component, framework, language, children }: CodeTabItemProps) {

    const filename = `${component}.${framework}.${language}`;
    return (
        <TabItem
            value={filename}
            label={
                <Avatar
                    src={sources[framework]}
                    name={filename}
                /> as any
            }
        >
            {children}
        </TabItem>
    );
}