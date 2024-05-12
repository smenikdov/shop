// Обобщённый тип для функций
type AnyFunction<T extends any[], R> = (...args: T) => R;

// Обобщённая функция wrap, которая оборачивает другую функцию и добавляет логирование
function wrap<T extends any[], R>(func: AnyFunction<T, R>): AnyFunction<T, R> {
    return function (...args: T): R {
        console.log(`Вызвана функция с аргументами: ${args.join(', ')}`);
        const result = func(...args);
        console.log(`Результат: ${result}`);
        return result;
    };
}

// Функция sum, суммирующая два числа
function sum(a: number, b: number): number {
    return a + b;
}

// Создание новой функции sumWithWrap с помощью wrap
const sumWithWrap = wrap(sum);

// Пример использования
const result = sumWithWrap(5, 3); // Выведет: "Вызвана функция с аргументами: 5, 3" и "Результат: 8"
console.log(result); // Выведет: 8
