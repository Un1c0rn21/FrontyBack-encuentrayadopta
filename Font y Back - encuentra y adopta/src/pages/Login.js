import { Button, Form, Input, Avatar } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
const Login = () => {
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const secondForm = (<>
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            name="nombre"
            label="Nombre"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa tu nombre!',
                    whitespace: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="direccion"
            label="Dirección"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa tu nombre!',
                    whitespace: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="celular"
            label="Celular"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa tu celular!',
                },
            ]}
        >
            <Input
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    </>)
    const defaultForm = (
        <>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

        </>
    )
    const [form] = Form.useForm();
    const [optionsForm, setoptionsForm] = useState(defaultForm)
    const [toggleForm, setToggleForm] = useState(true)
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const register = () => {
        setToggleForm(!toggleForm);
    }
    return (
        <div className='content_form'>
            <Avatar
                icon={<UserOutlined />}
                size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                }} />

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                style={{
                    maxWidth: 800,
                    minWidth: 500
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                scrollToFirstError
            >
                {toggleForm ? optionsForm : secondForm}

                <Form.Item
                    {...tailFormItemLayout}
                >
                    <Button type="primary" htmlType="submit">
                        {toggleForm ? 'Ingresar' : 'Registrar'}
                    </Button>
                    <a onClick={() => register()}>{toggleForm ? 'Registrate ahora!' : 'Ingresar!'}</a>
                </Form.Item>
            </Form>
        </div>
    );

}
export default Login;