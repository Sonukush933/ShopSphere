import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import PublicLayout from "../layouts/PublicLayout";
import ProductsPage from "../pages/public/ProductsPage";
import LoginPage from "../pages/auth/LoginPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "products",
        element: <ProductsPage/>
      }
    ]
  },
]);

export default router;