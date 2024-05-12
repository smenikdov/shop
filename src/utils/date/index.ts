export const formatDate = (
    date: Date,
    format: string = 'dd.MM.yyyy hh:mm',
    options = {}
): string => {
    const f = (digit: number, length: number = 2): string => {
        return digit.toString().padStart(length, '0');
    };

    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();

    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    format = format.replace('yyyy', f(yyyy, 4));
    format = format.replace('MM', f(MM, 2));
    format = format.replace('dd', f(dd, 2));
    format = format.replace('hh', f(hh, 2));
    format = format.replace('mm', f(mm, 2));
    format = format.replace('ss', f(ss, 2));

    return format;
};
