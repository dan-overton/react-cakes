export interface Cake {
    id?: string;
    name: string;
    comment: string;
    imageUrl: string;
    yumFactor: number;
}

export interface FormValue<T> {
    value: T;
    valid: boolean;
    touched: boolean;
}