'use client';
import { Loader, ServerCrash } from "lucide-react"

export const ContentLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="container min-h-80 py-8">
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export const ErrorView = () => {
    return (
        <ContentLayout>
            <div className="container py-20 h-full">
                <div className="flex items-center justify-center">
                    <ServerCrash className="text-red-500" size={48} />
                    <span className="text-red-500 text-center text-4xl ml-4">
                        Ops... Something is wrong...
                    </span>
                </div>
            </div>
        </ContentLayout>
    )
}
