import { useState } from 'react';
import { HomeOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate, useLocation   } from "react-router-dom";
import { Menu } from 'antd';
const MenuBar = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const items = [
        {
            label: 'Inicio',
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: 'Publicar',
            key: 'post',
            icon: <PlusOutlined />,
        },
        {
            label: 'Mis publicaciones',
            key: 'myposts',
            icon: <FileTextOutlined  />,
        }
    ];
    const [current, setCurrent] = useState(location.pathname.split('/')[1]);
    const onClick = (e) => {
    
        setCurrent(e.key);
        navigate(`/${e.key}`)
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}
export default MenuBar;