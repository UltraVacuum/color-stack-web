import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}

// page color preview color polyfill
export function GetRevelJson(p: any) {
    // todo: ref
    if (
        typeof p === 'object' &&
        Array.isArray(p) &&
        p !== null
    ) {
        return p;
    } else {
        return JSON.parse(p);
    }
}
