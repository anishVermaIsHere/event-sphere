import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appRoutes from "../routes/routes";


export default function AppRoutePovider(){
  return (
    <RouterProvider router={createBrowserRouter(appRoutes)} />
  )
}
