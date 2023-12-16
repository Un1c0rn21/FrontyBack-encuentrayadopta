import { userApi } from "./config"

export const guardarPost = async (form) =>{
    try {
        const url = '/api/posts';
        await userApi.post(url, form)
    } catch (error) {
        console.log(error)
    }

}

export const obtenerTodosLosPost = async (form) =>{
    try {
        const url = 'api/posts';
        const posts = await userApi.get(url, form)
        return posts.data.posts.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    } catch (error) {
        console.log(error)
    }

}

export const eliminarPost = async (id) =>{
    try {
        const url = `api/posts/${id}`;
        const posts = await userApi.delete(url)
        return posts
    } catch (error) {
        console.log(error)
    }

}