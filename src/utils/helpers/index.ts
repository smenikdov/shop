export const sleep = (duration: number = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export const pluck = <T, K extends keyof T>(objs: T[], key: K): T[K][] => {
    return objs.map((obj) => obj[key]);
};

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean;
    let lastFn: ReturnType<typeof setTimeout>;
    let lastTime: number;
    return function (this: any) {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(
                () => {
                    if (Date.now() - lastTime >= wait) {
                        fn.apply(context, args);
                        lastTime = Date.now();
                    }
                },
                Math.max(wait - (Date.now() - lastTime), 0)
            );
        }
    };
};

export const fakeAPICall = (success: boolean, timeout: number = 500, response: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(response);
            } else {
                reject({ message: 'Error' });
            }
        }, timeout);
    });
};

export const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
