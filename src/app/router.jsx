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
import MyBlogsList from "../components/myProfile/MyBlogsList";
import MyReadingList from "../components/myProfile/MyReadingList";
import MyFavoritesList from "../components/myProfile/MyFavoritesList";
// import {NewBlog} from "../pages/NewBlog";



export const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout />,
        // errorElement: <Error />,
        children: [
            { index: true, element: <Navigate to="/home" replace /> }, // kullanici / ya gittiginde home yönlendiriliyor. replace yaziyoru cunku her geri yaptiginda bir da home a yönlen
            { path: "home", element: <Home /> },

            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "contact", element: <Contact /> },
            { path: "about", element: <About /> },
            {
                element: <ProtectedRouted />,
                children: [
                    { path: "blog/:id", element: <BlogDetail /> },
                    {
                        path: "my-profile", element: <MyProfile />,
                        children: [
                            { path: "my-blogs", element: <MyBlogsList /> },
                            { path: "my-favorites", element: <MyFavoritesList /> },
                            { path: "my-reading-list", element: <MyReadingList /> },
                            { path: "add-new-blog", element: <NewBlog /> },
                            { path: "edit-blog", element: <NewBlog /> },
                        ]
                    },
                ],
            },
        ],
    },
]);
