export const getCurrentDate = (format: string = 'dd.MM.yyyy hh:mm:ss', options = {}): string => {
    const f = (digit: number, length: number = 2): string => {
        return digit.toString().padStart(length, '0');
    };

    const now = new Date();

    const yyyy = now.getFullYear();
    const MM = now.getMonth() + 1;
    const dd = now.getDay();

    const hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();

    format = format.replace('yyyy', f(yyyy, 4));
    format = format.replace('MM', f(MM, 2));
    format = format.replace('dd', f(dd, 2));
    format = format.replace('hh', f(hh, 2));
    format = format.replace('mm', f(mm, 2));
    format = format.replace('ss', f(ss, 2));

    return format;
};
