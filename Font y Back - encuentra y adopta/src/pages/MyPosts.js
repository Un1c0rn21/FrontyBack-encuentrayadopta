import { Card, Button, message} from 'antd';
import MenuBar from './MenuBar';
import { useEffect, useState } from 'react';
import { eliminarPost, obtenerTodosLosPost } from '../servicios/requests';

const { Meta } = Card;
const MyPosts = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function fetchData() {
            await obtenerPost();
        }
        fetchData();
    }, [])
    const obtenerPost = async () => {
        const result = await obtenerTodosLosPost();
        console.log(result)
        setPosts(result)
    }
    const eliminarPublicacion = async (id) => {
        
        await eliminarPost(id)
        await obtenerPost()
        messageApi.open({
            type: 'success',
            content: 'Se ha eliminado exitosamente',
        });
    }

    return (
        <>
            <MenuBar />
            <div className='list'>
                <>
                    {posts.map(post => (
                        <div className='list__card' key={post.id}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={`http://localhost:8000/uploads/${post.mascota.url_foto}`} />}
                            >
                                <Meta title={post.mascota.nombre} description={new Date(post.fecha).toDateString()} />
                                <Button type="primary" danger onClick={() => eliminarPublicacion(post.id)}>
                                    Eliminar publicación
                                </Button>
                            </Card>
                        </div>
                    ))}
                </>

            </div>
            {contextHolder}
        </>
    );
}
export default MyPosts;