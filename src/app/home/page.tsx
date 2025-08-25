import { createClient } from "@/supabase/server";

import Navigation from "@/components/local/navigation";
import { ErrorView } from "@/components/local/layout";

import Hero from './components/hero'
import DyHero from './components/dy-hero';
import SubPanels from './components/sub-panels';
import ColorSets from './components/color-sets';
import ThemePanels from './components/theme-panels';

const getData = async () => {
  const pg = Math.round(Math.random() * 10 + 1) // page
  const ps = 64 // page size - exactly 64 colors for the grid
  const skip = pg * ps
  const supabase = await createClient()
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
    <>
      <div className="relative">
        <Hero>
          <DyHero colorSets={data} />
        </Hero>
        <Navigation />
        <ThemePanels />
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-8 pb-16 max-w-7xl mx-auto">
          <ColorSets colorSets={data} />
          <SubPanels />
        </div>
      </div>
    </>
  )
}
