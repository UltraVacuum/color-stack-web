import { chunk, slice, shuffle } from "lodash"
import './dy-hero.css';

const LINE_SIZE = 30
const THEME_SIZE = 5

const genRdx = (n: number) => Math.floor(Math.random() * n)

const reLoop = (arr: Array<any>, start: number) => {
    const left = slice(arr, 0, start)
    const right = slice(arr, start, arr.length)
    return [...right, ...left]
}

const ThemeBlock = ({ theme }: any) => {
    return (
        <div className="flex-none w-40 h-8 flex items-center rounded-sm overflow-hidden">
            {
                theme.map((c: any, i: any) => {
                    return (
                        <div
                            className="flex-none w-8 h-8"
                            key={i}
                            style={{
                                background: `${c.hex}`
                            }}
                        ></div>
                    )
                })
            }
        </div>
    )
}

const LineBlock = ({ line }: any) => {
    // line block
    const ls = genRdx(line.length)
    const loopLine = reLoop(line, ls)
    const themes = chunk(loopLine, THEME_SIZE)
    return (
        <div className="flex flex-nowrap space-x-2">
            {
                themes.map((t: any, ii: any) => {
                    return (
                        <ThemeBlock theme={t} key={ii} />
                    )
                })
            }
        </div>
    )
}

export default function DyHero({ colorSets }: any) {
    // const lines = chunk(colorSets, LINE_SIZE)
    const lines = new Array(LINE_SIZE).fill(1)
    const shLine = shuffle(colorSets)
    return (
        <div className="dy-container w-1/3 h-3/4 rounded-3xl">
            <div className="dy-content dy-rotate">
                <div className="palettes-scroller is-animating space-y-2">
                    {
                        lines.map((ln: any, i: any) => {
                            return (
                                <LineBlock line={shLine} key={i} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
