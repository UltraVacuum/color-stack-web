import { createClient } from "@/supabase/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('page_colors')
        .select(`*, 
            user:users(
                id,
                avatar:user_meta->avatar_url,
                name:user_meta->full_name
                )
            )`)
        .eq('id', resolvedParams.id)

    return Response.json(data)
}
