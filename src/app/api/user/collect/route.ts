import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pg = Number(searchParams.get('page')) // page
    const ps = Number(searchParams.get('page_size')) || 15 // page size
    // // console.log('page', pg)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({
        data: [],
        error: {
            message: 'User not found'
        }
    })
    const { data, error } = await supabase
        .from('page_colors')
        // .select(`
        //     *,
        //     collects:page_colors (
        //         *
        //     )
        // `)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(ps * (pg - 1), ps * (pg - 1) + ps - 1)

    return Response.json(data)
}
