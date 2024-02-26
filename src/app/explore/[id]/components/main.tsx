'use client';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Main({ eid }: { eid: string }) {
    const fetchItem = async (id: string) => {
        const res = await fetch(`/api/explore/${id}`,
            { method: "GET" }
        )
        const resp = res.json()
        console.log(resp)
    }

    const { data, error, isLoading } = useSWR(
        `/api/explore/${eid}`,
        { method: "POST" },
        fetcher
    )

    fetchItem(eid);

    return (
        <>main </>
    )
}
