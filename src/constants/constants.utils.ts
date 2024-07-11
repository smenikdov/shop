import { AnyObject } from '@/typings';

type ConstantValues<ConstantTypes extends string> = {
    readonly [key in ConstantTypes]: ConstantTypes;
};

type ConstantLabels<ConstantTypes extends string> = {
    readonly [key in ConstantTypes]: string;
};

export const CreateConstants = <ConstantTypes extends string>(
    constantLabels: ConstantLabels<ConstantTypes>
): [ConstantValues<ConstantTypes>, ConstantLabels<ConstantTypes>] => {
    const constantValues = {} as ConstantValues<ConstantTypes>;

    for (let key of Object.keys(constantLabels)) {
        if (constantLabels.hasOwnProperty(key)) {
            //@ts-ignore
            constantValues[key] = key;
        }
    }

    return [constantValues, constantLabels];
};

export const getOptionsFromConstants = (constants: AnyObject) => {
    return Object.keys(constants).map((key) => ({
        value: key,
        label: constants[key],
    }));
};
