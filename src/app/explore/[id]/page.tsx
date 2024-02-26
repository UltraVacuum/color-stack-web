import { BasicLayout } from "@/components/local/page-layout";
import Main from './components/main';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <BasicLayout>
            aaa 100000012
            <Main eid={params.id} />
        </BasicLayout>
    )
}
