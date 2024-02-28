import { createClient } from "@/supabase/client";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('page_colors')
        // .select('*, auth.users(*)')
        // .eq('page_colors.user_id', 'auth.users.id')
        // .select('*, auth.users(user_id)')
        .select('*')
        .eq('id', params.id)

    return Response.json(data)
}
