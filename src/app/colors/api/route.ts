import { createClient } from "@/supabase/client";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pg = Number(searchParams.get('page')) // page
    const ps = 100 // page size

    const supabase = createClient()
    const { data, error } = await supabase.from('page_colors')
        .select('*')
        .range(pg * ps + 1, pg * ps + ps)

    return Response.json({
        page: {
            prev: pg - 1,
            curr: pg,
            next: pg + 1,
            count: 1314,
            results: data
        }
    })
}
