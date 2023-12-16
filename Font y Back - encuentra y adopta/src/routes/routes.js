import {
    createBrowserRouter
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Post from "../pages/Post";
import MyPosts from "../pages/MyPosts";

const routes = createBrowserRouter([
    { path: "/login", element: <Login/> },
    { path: "/home", element: <Home/> },
    { path: "/post", element: <Post/> },
    { path: "/myposts", element: <MyPosts/> }
])

export default routes;