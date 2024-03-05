import { createClient } from "@/supabase/client";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('page_colors')
        .select(`*, 
            user:users(
                id,
                avatar:user_meta->avatar_url,
                name:user_meta->full_name
                )
            )`)
        // .eq('page_colors.user_id', 'auth.users.id')
        // .select('*, auth.users(user_id)')
        // .select('*')
        .eq('id', params.id)

    return Response.json(data)
}
