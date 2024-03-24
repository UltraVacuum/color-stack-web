import {
    SORT_BY_RGB,
    SORT_BY_HSV,
    SORT_BY_HSL,
    SORT_BY_HUE,
    SORT_BY_LUM,
    MODE_LIGHT,
} from "@/const";

const noop = () => { };

type Color = {
    alpha?: number,
    rgb: Array<number>,
    hex: string,
    hsl?: Array<number>,
    hsv?: Array<number>,
    hue?: number,
    lum?: number,
}

// color sort algorithm
export default function ColorSort(
    colors: Array<Color>,
    sort = SORT_BY_RGB,
    mode = MODE_LIGHT
) {

    const euclidean = (a1: any, a2: any) => {
        const args = a1.map((v: any, i: any) => {
            if (i > 2) return 0
            return v - a2[i]
        })
        return Math.hypot(...args);
    }

    // gen fn to cal two color distance by color space value
    const disFn = (v: any) => (a: any, b: any) => euclidean(a[v], b[v])
    // gen fn to sort two color by compare value
    const cmpFn = (v: any) => (a: any, b: any) => mode === MODE_LIGHT ?
        b[v] - a[v] : a[v] - b[v]

    // get nearest color
    // s: start color
    // df: get distance function
    // cs: rest colors
    const nc = (s: any, df: any, cs: any) => {
        const sc = [...cs]
        const sfn = (a: any, b: any) => a.d - b.d;
        return sc.map(x => {
            x.d = df(s, x)
            return x
        }).sort(sfn)[0];
    }

    // compare sort function
    const cSortFn = (sb: any) =>
        (colors: any) => colors.toSorted(cmpFn(sb))

    // distance sort function
    // sb: sort by [rgb|hsl|hsv] distance
    const dSortFn = (sb: any) => {

        if ([SORT_BY_HSL, SORT_BY_HSV, SORT_BY_RGB].indexOf(sb) === -1)
            return noop

        return (colors: any) => {
            const sDisFn = disFn(sb)
            const path = [];
            let start = {
                hex: mode === MODE_LIGHT ? '#FFFFFF' : '#000000',
                rgb: mode === MODE_LIGHT ? [255, 255, 255] : [0, 0, 0],
                hsl: mode === MODE_LIGHT ? [0, 0, 100] : [0, 0, 0],
                hsv: mode === MODE_LIGHT ? [0, 0, 100] : [0, 0, 0]
            };
            let tc = [...colors];
            while (tc.length > 0) {
                let nearest = nc(start, sDisFn, tc);
                if (!nearest) continue;
                path.push(nearest);
                tc = tc.filter(x => x.hex !== nearest.hex);
                start = nearest;
            }
            return path;
        }
    }

    // compare sort
    if (sort === SORT_BY_LUM) return cSortFn(SORT_BY_LUM)(colors)
    if (sort === SORT_BY_HUE) return cSortFn(SORT_BY_HUE)(colors)
    // distance sort
    if (sort === SORT_BY_RGB) return dSortFn(SORT_BY_RGB)(colors)
    if (sort === SORT_BY_HSV) return dSortFn(SORT_BY_HSV)(colors)
    if (sort === SORT_BY_HSL) return dSortFn(SORT_BY_HSL)(colors)
    // default
    return cSortFn(SORT_BY_LUM)(colors)
}
