export type NumericKey<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];
