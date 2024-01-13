export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const p = searchParams.get('page')
    const ps = searchParams.get('page_size')
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/color-sets?page=${p}&page_size=${ps}`, {
            method: "GET",
        })
        const page = await res.json()
        console.log('color set page', page)
        return Response.json({ page })
    } catch (error) {
        return Response.json({ page: [] })
    }
}
