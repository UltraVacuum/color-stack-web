export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const p = searchParams.get('page')
    console.log('page===>', p)
    const res = await fetch(`http://localhost:8000/spa/api/colors?page=${p}`, {
        method: "GET",
    })
    const page = await res.json()
    return Response.json({ page })
}
