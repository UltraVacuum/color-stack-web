import { useRef, ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"


// Masonry Vertical Virtualizer Variable
export function VerticalMasonry({
    rows,
    children
}: {
    rows: any,
    children: ReactNode
}) {
    const parentRef = useRef()

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (i) => rows[i],
        overscan: 5,
        lanes: 4,
    })

    return (
        <>
            <div
                ref={parentRef}
                style={{
                    width: `100%`,
                    overflow: 'auto',
                }}
                className="h-screen px-8"
            >
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizer.getVirtualItems().map((virtualRow) => (
                        <div
                            key={virtualRow.index}
                            ref={virtualizer.measureElement}
                            className={virtualRow.index % 2 ? 'bg-red-400' : 'bg-blue-400'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: `${virtualRow.lane * 25}%`,
                                width: '25%',
                                // height: `${rows[virtualRow.index]}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            Row {virtualRow.index}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
