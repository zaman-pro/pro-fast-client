import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import Error from "../Pages/Error/Error";
import AddParcel from "../Pages/AddParcel/AddParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("./serviceCenter.json"),
        hydrateFallbackElement: <h1>Loading...</h1>,
      },
      {
        path: "add-parcel",
        Component: AddParcel,
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
