type SearchParam = string | undefined | null;

export const parseSearchParams = {
    integer: (param: SearchParam): number => {
        return param ? parseInt(param) : 0;
    },

    float: (param: SearchParam): number => {
        return param ? parseFloat(param) : 0;
    },

    string: (param: SearchParam): string => {
        return param ? String(param) : '';
    },

    boolean: (param: SearchParam): boolean => {
        return param ? Boolean(param) : false;
    },
};
