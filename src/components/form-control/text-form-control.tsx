import React, { ChangeEvent } from 'react';
import { Input } from 'bloomer/lib/elements/Form/Input';
import FormControl, { FormControlProps } from './form-control';

export interface TextFormControlProps extends FormControlProps<string> {
    name: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextFormControl: React.FunctionComponent<TextFormControlProps> = (props: TextFormControlProps) => {
    const { label, placeholder, name, value, onChange, validationMessage } = props;
    const ctrlProps = {validationMessage, label, value};
    const inputProps = {placeholder, name, value: value.value, onChange};

    return (
        <FormControl {...ctrlProps}>
          <Input type="text" {...inputProps} />
        </FormControl>
    );
}
export default TextFormControl;