import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import PublicLayout from "../layouts/PublicLayout";
import ProductsPage from "../pages/public/ProductsPage";



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
        path: "products",
        element: <ProductsPage/>
      }
    ]
  },
]);

export default router;