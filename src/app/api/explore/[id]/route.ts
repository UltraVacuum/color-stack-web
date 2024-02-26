import { createClient } from "@/supabase/client";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('page_colors')
        .select('*')
        .eq('id', params.id)

    return Response.json(data)
}
