export const randomNumberFromRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const addSpacesToNumber = (number: number, delimiter: string = ' '): string => {
    let [numberBeforeDot, numberAfterDot] = number.toString().split('.');
    numberBeforeDot = numberBeforeDot.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    return `${numberBeforeDot}.${numberAfterDot}`;
};
