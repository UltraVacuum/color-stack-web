import { BasicLayout } from "@/components/local/layout";

import ColorFlow from './components/flow';

export default function Page() {
    return (
        <BasicLayout>
            <ColorFlow api={`/api/explore`} />
        </BasicLayout>
    )
}
