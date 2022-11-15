import { SliderArrow } from '../components/slider-arrow';
import { Form, Input, Select } from 'antd';
import dynamic from 'next/dynamic';
import {
    Collection,
    CustomCheckbox,
    CustomInput,
    CustomSearch,
    CustomSelect,
    CustomSwitch,
    CustomTextArea,
    TabFilter,
} from '../components';

const DynamicSwitchTheme = dynamic(() => import('../components/switch-theme'), {
    ssr: false,
});

export default function Home() {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <DynamicSwitchTheme />
            <div className="w-[100vw] h-[100vh] flex items-center justify-center">
                <TabFilter title="All" className="mr-5" />
                <TabFilter
                    title="Music"
                    icon={<i className="ri-music-fill" />}
                />
            </div>
        </>
    );
}
