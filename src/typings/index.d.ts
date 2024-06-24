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
