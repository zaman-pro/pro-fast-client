import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <h1>Error 404</h1>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "Coverage",
        Component: Coverage,
        loader: () => fetch("./serviceCenter.json"),
        hydrateFallbackElement: <h1>Loading...</h1>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
