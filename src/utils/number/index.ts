interface FormatNumberOptions {
    prefix?: string;
    suffix?: string;
    round?: number;
    delimiter?: string;
}

export const randomNumberFromRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const formatNumber = (number: number, options: FormatNumberOptions = {}) => {
    const output: Array<string> = [];
    let formatNumber = number.toString();
    if (options.round) {
        formatNumber = number.toFixed(options.round);
    }
    const isNegative = formatNumber[0] === '-';
    formatNumber = formatNumber.replace(/^\-/g, '');

    if (isNegative) {
        output.push('-');
    }
    if (options.prefix) {
        output.push(options.prefix);
    }
    let [numberBeforeDot, numberAfterDot] = formatNumber.split('.');
    numberBeforeDot = numberBeforeDot.replace(/\B(?=(\d{3})+(?!\d))/g, options.delimiter || ' ');
    output.push(numberBeforeDot);
    if (numberAfterDot) {
        output.push('.');
        output.push(numberAfterDot);
    }

    if (options.suffix) {
        output.push(options.suffix);
    }

    return output.join('');
};

export const getRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber);
};
