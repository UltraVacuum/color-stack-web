import ColorSort from "./color-sort"
import _ from 'lodash'
import { SORT_BY_RGB, MODE_DARK } from "@/const"
// true: filter
// false: not in filter range
const FILTER_THRESHOLD = 98
export function filterGray(rgb: Array<number>,
    threshold = FILTER_THRESHOLD) {
    for (let x of [[0, 1], [1, 2], [2, 0]]) {
        if (Math.abs(rgb[x[0]] - rgb[x[1]]) > threshold) {
            return true
        }
    }
    return false
}

export function filterWhite(rgb: Array<number>,
    threshold = FILTER_THRESHOLD) {
    for (let x of rgb) {
        if (x > (255 - threshold)) {
            return true
        }
    }
    return false
    // return all(value >= (255 - threshold) for value in rgb_values)
}

export function filterBlack(rgb: Array<number>,
    threshold = FILTER_THRESHOLD) {
    for (let x of rgb) {
        if (x < threshold) {
            return true
        }
    }
    return false
    // return all(value < threshold for value in rgb_values)
}

// sort and filter colors
const FILTER_SIZE = 6
export function filterShow(colors: Array<any>,
    size = FILTER_SIZE) {
    const sc = ColorSort(colors, SORT_BY_RGB, MODE_DARK)
    const fc = sc
        .filter(({ rgb }: any) => filterBlack(rgb, 90))
        .filter(({ rgb }: any) => filterWhite(rgb, 94))
        .filter(({ rgb }: any) => filterGray(rgb, 98))

    return fc.length == 0 ?
        _.slice(sc, 0, size) :
        _.slice(fc, 0, size)
}
