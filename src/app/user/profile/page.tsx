import { BasicLayout, ContentLayout } from "@/components/local/layout";

import ColorFlow from '@/app/explore/components/flow';

export default function Page() {
    return (
        <BasicLayout>
            <ContentLayout>
                <ColorFlow api={`/api/user/collect`} />
            </ContentLayout>
        </BasicLayout>
    )
}
