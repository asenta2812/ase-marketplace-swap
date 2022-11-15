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

export const CustomSelect = (props: SelectProps) => {
    return (
        <Select
            {...props}
            popupClassName="custom-select--popup"
            className={clsx('custom-select')}
            suffixIcon={
                <i className="ri-arrow-down-s-line ri-2x text-jacarta-700" />
            }
        />
    );
};

export const CustomInput = (props: InputProps) => (
    <Input {...props} className={clsx('custom-input')} />
);

export const CustomTextArea = (props: TextAreaProps) => (
    <Input.TextArea {...props} className={clsx('custom-textarea')} />
);

export const CustomSwitch = (props: SwitchProps) => (
    <Switch {...props} className="custom-switch" />
);

export const CustomCheckbox = (props: CheckboxProps) => (
    <Checkbox {...props} className={clsx('custom-checkbox')} />
);

export const CustomSearch = (props: InputProps) => (
    <Input
        {...props}
        className={clsx('custom-search')}
        prefix={<i className="ri-search-line text-base" />}
    />
);
