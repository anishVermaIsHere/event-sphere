import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "../routes/routes";


export default function AppRoutePovider({ children }){

  return (
    <RouterProvider router={createBrowserRouter(routes)}>
      {children}
    </RouterProvider>
  )
}
