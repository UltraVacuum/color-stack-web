import { Navigation } from "./components/navigation";
import { PageColor } from './components/page-color';

export default async function Page() {
    return (
        <main className="">
            <Navigation />
            <PageColor />
        </main>
    )
}
