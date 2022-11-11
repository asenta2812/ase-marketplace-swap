import {
    Checkbox,
    CheckboxProps,
    Input,
    InputProps,
    Select,
    SelectProps,
    Switch,
    SwitchProps,
} from 'antd';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import clsx from 'clsx';

export type Color = {
    color?: 'default' | 'dark';
};
export const CustomSelect = (props: SelectProps & Color) => {
    return (
        <Select
            {...props}
            popupClassName="custom-select--popup"
            className={clsx(
                'custom-select',
                `custom-select--${props.color ? props.color : 'default'}`
            )}
            suffixIcon={
                <i className="ri-arrow-down-s-line ri-2x text-jacarta-700" />
            }
        />
    );
};

export const CustomInput = (props: InputProps & Color) => (
    <Input
        {...props}
        className={clsx(
            'custom-input',
            `custom-input--${props.color ? props.color : 'default'}`
        )}
    />
);

export const CustomTextArea = (props: TextAreaProps & Color) => (
    <Input.TextArea
        {...props}
        className={clsx(
            'custom-textarea',
            `custom-textarea--${props.color ? props.color : 'default'}`
        )}
    />
);

export const CustomSwitch = (props: SwitchProps) => (
    <Switch {...props} className="custom-switch" />
);

export const CustomCheckbox = (props: CheckboxProps & Color) => (
    <Checkbox
        {...props}
        className={clsx(
            'custom-checkbox',
            `custom-checkbox--${props.color ? props.color : 'default'}`
        )}
    />
);

export const CustomSearch = (props: InputProps & Color) => (
    <Input
        {...props}
        className={clsx(
            'custom-search',
            `custom-search--${props.color ? props.color : 'default'}`
        )}
        prefix={<i className="ri-search-line text-base" />}
    />
);
