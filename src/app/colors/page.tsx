import { Navgation } from "./components/navgation";
import { PageColor } from './components/page-color';

export default async function Page() {
    return (
        <main className="">
            <Navgation />
            <PageColor />
        </main>
    )
}
