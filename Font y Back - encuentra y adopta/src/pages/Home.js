import { Card, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MenuBar from './MenuBar';
import ciudades from '../data/ciudades.json'
import { useEffect, useState } from 'react';
import { obtenerTodosLosPost } from '../servicios/requests';

const { Meta } = Card;
const Home = () => {
    const [history, setHistory] = useState([])
    const [posts, setPosts] = useState([])
    const [ciudad, setCiudad] = useState()
    const [tipo, setTipo] = useState()
    const [razon, setRazon] = useState()
    useEffect( () => {
        async function fetchData() {
            const result = await obtenerTodosLosPost();
            console.log(result)
            setPosts(result)
            setHistory(result)
          }
          fetchData();
    }, [])
    
    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const clearSelected = () => {
        setCiudad(null)
        setTipo(null)
        setRazon(null)
        setPosts([...history])
      }
    const aplicarFiltros = () => {
        let postsAux = [...posts]
        if (ciudad) {
            postsAux = postsAux.filter(item => item.mascota.ciudad === ciudad)
        }
        if (tipo) {
            postsAux = postsAux.filter(item => item.mascota.tipo_mascota === tipo)
        }
        if (razon) {
            postsAux = postsAux.filter(item => item.razon === razon)
        }
        setPosts(postsAux)
    }
    return (
        <>
        <MenuBar/>
            <div className='filters'>
            <Select
                showSearch
                placeholder="Selecciona una ciudad"
                optionFilterProp="children"
                filterOption={filterOption}
                options={ciudades}
                onChange={value => setCiudad(value)} 
                value={ciudad}
            />
            <Select
            placeholder="Tipo de mascota"
                options={[
                    { value: 'Perro', label: 'Perro' },
                    { value: 'Gato', label: 'Gato' },
                    { value: 'Conejo', label: 'Conejo' },
                ]}
                onChange={value => setTipo(value)} 
                value={tipo}
            />
            <Select
                placeholder="Razón"
                options={[
                    { value: 'Rescatado', label: 'Rescatado' },
                    { value: 'Adopción', label: 'Adopción' },
                ]}
                onChange={value => setRazon(value)} 
                value={razon}
            />
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => aplicarFiltros()}/>
            <Button type="primary" danger onClick={() => clearSelected()}>
                                    Limpiar filtros
                                </Button>
            
            </div>
            <div className='list'>
                <>
                {posts.map(post => (
                    <div className='list__card' key={post.id}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={`http://localhost:8000/uploads/${post.mascota.url_foto}`} />}
                >
                    <Meta title={post.mascota.nombre} description={new Date(post.fecha).toDateString()}/>
                    <p>{`Raza: ${post.mascota.raza}`}</p>
                    <p>{`Estado: ${post.razon}`}</p>
                    <p>{`Ciudad: ${post.mascota.ciudad}`}</p>
                    <p>{`Responsable: ${post.usuario.nombre}`} </p>
                    <p>{`Celuar: ${post.usuario.celular}`}</p>
                    <p>{`Descripción: ${post.descripcion}`} </p>
                </Card>
                </div>
                ))}
                </>
                
            </div>
        </>
    );
}
export default Home;