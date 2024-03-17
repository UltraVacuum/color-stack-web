import { createClient } from "@/supabase/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pg = Number(searchParams.get('page')) // page
    const ps = Number(searchParams.get('page_size')) || 15 // page size
    // // console.log('page', pg)
    const supabase = createClient()
    const { data, error } = await supabase
        .from('page_colors')
        .select(
            `*, 
                user:users(
                    id,
                    avatar:user_meta->avatar_url,
                    name:user_meta->full_name
                )
            )`
        )
        .order('updated_at', { ascending: false })
        .range(ps * (pg - 1), ps * (pg - 1) + ps - 1)

    return Response.json(data)
}
