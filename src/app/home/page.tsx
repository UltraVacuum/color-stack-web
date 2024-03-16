import { createClient } from "@/supabase/client";

import Navigation from "@/components/local/navigation";
import { ErrorView } from "@/components/local/layout";
import Hero from './components/hero'
import DyHero from './components/dy-hero';

import SubPanels from './components/sub-panels';
import ColorSets from './components/color-sets'

const getData = async () => {
    const pg = Math.round(Math.random() * 10 + 1) // page
    const ps = 24 * 12 // page size
    const skip = pg * ps
    const supabase = createClient()
    return await supabase
        .from('color_sets')
        .select('*')
        .range(skip + 1, skip + ps)
}

export default async function Home() {
    const { data, error } = await getData()

    if (error) return (
        <ErrorView>
            {error.message}
        </ErrorView>
    )

    return (
        <div className="relative">
            <Hero>
                <DyHero colorSets={data} />
            </Hero>
            <Navigation />
            <div className="flex min-h-screen flex-col
                items-center justify-between lg:px-24 px-4">
                <ColorSets colorSets={data} />
                <SubPanels />
            </div>
        </div>
    )
}
