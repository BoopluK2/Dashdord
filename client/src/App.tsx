import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Home from "./page/home/Home"
import Users from "./page/users/Users";
import Products from "./page/products/Products";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import Login from "./page/login/Login";

import "./styles/global.scss"
import User from "./page/user/User";
import Product from "./page/product/Product";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />  
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/users/:id",
          element: <User />
        },
        {
          path: "/products/:id",
          element: <Product />
        },
      ]
    },
    {
      path: "login",
      element: <Login />
    }
   
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
