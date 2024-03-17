import ColorItemBasic from '@/components/local/color-item';

export default function ColorSets({ colorSets }: any) {
    return (
        <>
            <div className="z-10 w-full text-center
                md:flex items-center font-mono 
                ">
                <p className="w-full pb-6 pt-8 ">
                    Find color patterns in our Datasets.
                </p>
            </div>
            <div className="flex flex-wrap mx-auto">
                {
                    colorSets.map((color: any, idx: number) => {
                        return <ColorItemBasic color={color} key={idx} />
                    })
                }
            </div>
        </>
    )
}
