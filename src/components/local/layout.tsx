import Navigation from "@/components/local/navigation";

export const BasicLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    )
}

export const ContentLayout = ({ children }: {
    children: React.ReactNode
}) => {
    'use client';
    return (
        <div className="container min-h-80 py-8">
            {children}
        </div>
    )
}
