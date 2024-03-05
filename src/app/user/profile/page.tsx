import { BasicLayout, ContentLayout } from "@/components/local/layout";

import Flow from './components/flow';

export default function Page() {
    return (
        <BasicLayout>
            <ContentLayout>
                <Flow />
            </ContentLayout>
        </BasicLayout>
    )
}
