export const required = (val?: string) => !!(val && val.trim())
export const startsWithProtocol = (val?: string) => !!(val && (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('ftp://')));
export const between = (lower: number, higher: number) => (val: number) => val >= lower && val <= higher;