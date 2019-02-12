import { Control } from 'bloomer/lib/elements/Form/Control';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Label } from 'bloomer/lib/elements/Form/Label';
import React, { ReactNode } from 'react';
import { FormValue } from '../../models';

export interface FormControlProps<T> {
    label: string;
    value: FormValue<T>;
    validationMessage: string;
    children?: ReactNode;
}

const FormControl: React.FunctionComponent<FormControlProps<any>> = (props: FormControlProps<any>) => {
    const { label, value, validationMessage } = props;

    return (
        <Field>
            <Label>{label}</Label>
            <Control>
                {props.children}
                <div className={"validation-message" + (value.touched && !value.valid ? ' validation-message-display' : '')}><span>{validationMessage}</span></div>
            </Control>
        </Field>
    );
}
export default FormControl;