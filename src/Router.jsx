import { createBrowserRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from "./Home";
import City from "./City";

const Router = () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <Home />
    }, 
    {
      path: "search/:name",
      element: <City />
    }
  ])

  return <RouterProvider router={router}/>
}

export default Router