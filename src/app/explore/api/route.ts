import { createClient } from "@/supabase/client";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pg = Number(searchParams.get('page')) // page
    const ps = 100 // page size
    // // console.log('page', pg)
    const supabase = createClient()
    const { data, error } = await supabase.from('page_colors')
        .select('*')
        .order('created_at', { ascending: false })
        .range(ps * (pg - 1), ps * (pg - 1) + ps - 1)

    return Response.json({
        page: {
            // prev: pg - 1,
            // curr: pg,
            // next: pg + 1,
            // count: 1314,
            results: data
        }
    })
}
