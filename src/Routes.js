import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import Home from "./home/Home";
import Pigs from "./pigs/Pigs";
import PigDetails from "./pigs/pig-details/PigDetails";
import NotFoundScreen from "./not-found/NotFoundScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/registro",
    element: <Register/>,
  },
  {
    path: "/dashboard",
    element: <Home/>
  },
  {
    path: '/cerdas',
    element: <Pigs/>
  },
  {
    path: '/cerdas/:id',
    element: <PigDetails/>
  },
  {
    path: '*',
    element: <NotFoundScreen/>
  }
]);

const Routes = () => {
  return (
      <RouterProvider router={router} />
  );
}

export default Routes;
