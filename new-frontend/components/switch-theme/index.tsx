import React, { useEffect, useState } from 'react';
import { CustomSwitch } from '../custom-antd';
import { useTheme } from 'next-themes';

interface SwitchThemeProps {}

const SwitchTheme: React.FC<SwitchThemeProps> = ({}) => {
    const { systemTheme, theme, setTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const handleSwitchTheme = (state: boolean) => {
        const newTheme = state ? 'dark' : 'light';
        setTheme(newTheme);
    };
    return (
        <>
            <CustomSwitch
                onChange={handleSwitchTheme}
                checked={currentTheme === 'dark'}
            />
        </>
    );
};
export default SwitchTheme;
