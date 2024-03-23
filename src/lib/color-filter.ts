// true: filter
// false: not in filter range
const FILTER_THRESHOLD = 255 / 2.5
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
