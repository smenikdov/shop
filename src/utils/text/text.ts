export const capitalizeText = (text: string): string => {
    return text.toLowerCase().replace(/(^|\s)\w/g, (word) => word.toUpperCase());
};

export const getTruncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
        return description;
    }
    const truncated = description.substring(0, maxLength - 3);
    return truncated + '...';
};

export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
};

export const declineWord = (number: number, word1: string, word2: string, word5: string) => {
    let lastDigit = number % 10;
    if (number % 100 >= 11 && number % 100 <= 19) {
        return word5;
    } else if (lastDigit === 1) {
        return word1;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return word2;
    } else {
        return word5;
    }
};

export const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})(.*)/, '+$1 ($2) $3 $4 $5$6');
};
