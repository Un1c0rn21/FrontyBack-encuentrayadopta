import { Button, Form, Input, Upload, message, Select } from 'antd';
import MenuBar from './MenuBar';
import { UploadOutlined } from '@ant-design/icons';
import { guardarPost } from '../servicios/requests';
import { useNavigate } from 'react-router-dom';
import ciudades from '../data/ciudades.json'
const Post = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();


    const onFinish = async (values) => {
        console.log('Success:', values);
        const form = new FormData();
        form.append('file', values.image.file)
        form.append('razon', values.razon)
        form.append('descripcion', values.descripcion)
        form.append('usuario_id', 1)
        form.append('raza', values.raza)
        form.append('ciudad', values.ciudad)
        form.append('tipo_mascota', values.tipo_mascota)
        form.append('nombre', values.nombre)
        form.append('fecha', new Date().toUTCString())
        await guardarPost(form)
        messageApi.open({
            type: 'success',
            content: 'Se ha publicado exitosamente',
        });
        setTimeout(() => {
            navigate(`/home`)
        }, 2000)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const [form] = Form.useForm();
    const secondForm = (<>
        <Form.Item
            name="nombre"
            label="Nombre"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa el nombre de la mascota!',
                    whitespace: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="raza"
            label="Raza"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa la raza de la mascota!',
                    whitespace: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="tipo_mascota"
            label="Tipo de mascota"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa la raza de la mascota!',
                    whitespace: true,
                },
            ]}
        >
            <Select
                options={[
                    { value: 'Perro', label: 'Perro' },
                    { value: 'Gato', label: 'Gato' },
                    { value: 'Conejo', label: 'Conejo' },
                ]}
            />
        </Form.Item>
        <Form.Item
            name="image"
            label="Foto de la mascota"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa una imagen de la mascota!',
                },
            ]}
        >
            <Upload name="logo" beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
        <Form.Item
            name="ciudad"
            label="Ciudad"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa la ciudad!',
                    whitespace: true,
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Selecciona una ciudad"
                optionFilterProp="children"
                filterOption={filterOption}
                options={ciudades}
            />
        </Form.Item>
        <Form.Item
            name="razon"
            label="Razón"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa si está en adopción o fue rescatado!',
                    whitespace: true,
                },
            ]}
        >
            <Select
                options={[
                    { value: 'Rescatado', label: 'Rescatado' },
                    { value: 'Adopción', label: 'Adopción' },
                ]}
            />
        </Form.Item>
        <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingresa una breve descripción de la mascota!',
                    whitespace: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
    </>)

    return (
        <>
            <MenuBar />
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
                {secondForm}

                <Form.Item
                    {...tailFormItemLayout}
                >
                    <Button type="primary" htmlType="submit">
                        Publicar
                    </Button>
                </Form.Item>
            </Form>
            {contextHolder}
        </>
    )
}
export default Post;