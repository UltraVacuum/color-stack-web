export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const p = searchParams.get('page')
    const apiUrl = process.env.API_URL
    const res = await fetch(`${apiUrl}?page=${p}`, {
        method: "GET",
    })
    const page = await res.json()
    return Response.json({ page })
}
