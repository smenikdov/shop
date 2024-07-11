export type BaseColors =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'muted'
    | 'light'
    | 'dark';
export type BaseSizes = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type FontFamily = 'plex-serif' | 'plex-sans';

export type AnyObject = Record<PropertyKey, any>;
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

interface SearchParams {
    [key: string]: string;
}

interface PageProps<Params = undefined> {
    searchParams?: SearchParams;
    params: Params;
}

declare global {
    type integer = number;
    type float = number;
    type money = number;
    type uuid = string;
    type ISODate = string;
}
