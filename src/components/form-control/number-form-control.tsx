import React, { ChangeEvent } from 'react';
import { Input } from 'bloomer/lib/elements/Form/Input';
import FormControl, { FormControlProps } from './form-control';

export interface NumberFormControlProps extends FormControlProps<number> {
    name: string;
    min?: number,
    max?: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NumberFormControl: React.FunctionComponent<NumberFormControlProps> = (props: NumberFormControlProps) => {
    const { label, name, min, max, value, onChange, validationMessage } = props;
    const ctrlProps = {label, validationMessage, value};
    const inputProps = {min, max, name, value: value.value, onChange};

    return (
        <FormControl {...ctrlProps}>
          <Input type="number" {...inputProps} />
        </FormControl>
    );
}
export default NumberFormControl;