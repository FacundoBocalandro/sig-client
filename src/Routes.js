import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Login!</div>,
  },
]);

const Routes = () => {
  return (
      <RouterProvider router={router} />
  );
}

export default Routes;
