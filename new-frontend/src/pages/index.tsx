import { SliderArrow } from '@/components/slider-arrow';
import { Form, Input, Select } from 'antd';
import {
    Collection,
    CustomCheckbox,
    CustomInput,
    CustomSearch,
    CustomSelect,
    CustomSwitch,
    CustomTextArea,
} from '../components';

export default function Home() {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                style={{ width: 500 }}
            >
                <Form.Item
                    label="Text Input"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <CustomInput placeholder="Placeholder" color="dark" />
                </Form.Item>

                <Form.Item
                    label="Text Area"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <CustomTextArea
                        autoSize
                        placeholder="place holder"
                        color="dark"
                    />
                </Form.Item>

                <Form.Item label="Select" name="select">
                    <CustomSelect placeholder="!23123123123" color="dark">
                        <Select.Option key={1}>test option</Select.Option>
                        <Select.Option key={2}>z222zz</Select.Option>
                    </CustomSelect>
                </Form.Item>

                <Form.Item name="remember">
                    <CustomSwitch size="small" />
                </Form.Item>

                <Form.Item name="checked">
                    <CustomCheckbox color="dark">
                        Check 123123123
                    </CustomCheckbox>
                    <CustomCheckbox color="default">Check sss</CustomCheckbox>
                </Form.Item>

                <Form.Item name="hehehe" label="Search ne">
                    <CustomSearch placeholder="search search" />
                </Form.Item>
                <Form.Item name="he2hehe" label="Search  2ne">
                    <CustomSearch placeholder="search search" color="dark" />
                </Form.Item>

                <SliderArrow />
                <SliderArrow left />

                {/* <Collection rankNumber={1}  /> */}
            </Form>
        </div>
    );
}
