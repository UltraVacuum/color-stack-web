import Navigation from "@/components/local/navigation";

export const BasicLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="main">
            <Navigation />
            <div className="container">
                {children}
            </div>
        </div>
    )
}
