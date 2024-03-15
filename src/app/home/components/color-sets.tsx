import ColorItemBasic from '@/components/local/color-item';

export default function ColorSets({ colorSets }: any) {
    return (
        <>
            <div className="z-10 max-w-5xl w-full 
                items-center justify-between font-mono 
                lg:flex">
                <p className="flex w-full justify-center pb-6 pt-8 text-center">
                    Find color patterns in our Datasets.
                </p>
            </div>
            <div className="relative flex place-items-center">
                <div className="flex flex-wrap mx-auto">
                    {
                        colorSets.map((color: any, idx: number) => {
                            return <ColorItemBasic color={color} key={idx} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
