export type MeasureEditFormProps = {
    isCreate: true;
    isEdit: undefined;
    measureId: undefined;
} | {
    isCreate: undefined;
    isEdit: true;
    measureId: integer;
};
