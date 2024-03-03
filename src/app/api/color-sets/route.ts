import { createClient } from "@/supabase/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pg = Number(searchParams.get('page')) // page
    const ps = Number(searchParams.get('page_size')) || 30 // page size
    const supabase = createClient()
    const { data, error } = await supabase
        .from('color_sets')
        // .select(`
        //     *,
        //     name (
        //         color_info(id),
        //     )
        // `)
        .select('*')
        .order('created_at', { ascending: false })
        .range(ps * (pg - 1), ps * (pg - 1) + ps - 1)

    return Response.json(data)
}
