import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    const sks = new Array(8).fill(1)
    return (
        <div className="container py-8" >
            <div className="flex flex-col space-y-4 w-full" >
                <div className="space-y-4" >
                    <Skeleton className="h-6 w-1/2" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-4 w-[50px]" />
                    </div>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2 my-8">
                    {
                        sks.map((i: any, ii: any) => {
                            return <Skeleton
                                key={ii}
                                className="h-24 w-full rounded-sm" />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
