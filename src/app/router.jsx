import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import About from "../pages/About";
import BlogDetail from "../pages/BlogDetail";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ProtectedRouted from "../layout/ProtectedRouted";
import NewBlog from "../pages/NewBlog";
import MyProfile from "../pages/MyProfile";
// import {NewBlog} from "../pages/NewBlog";



export const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout />,
        // errorElement: <Error />,
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "home", element: <Home /> },

            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "contact", element: <Contact /> },
            { path: "about", element: <About /> },
            {
                element: <ProtectedRouted />,
                children: [
                    { path: "blog/:id", element: <BlogDetail /> },
                    { path: "create-blog", element: <NewBlog /> },
                    { path: "my-profile", element: <MyProfile /> },
                ],
            },
        ],
    },
]);
