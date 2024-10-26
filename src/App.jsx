import 'react-toastify/dist/ReactToastify.css';
import "./css/App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./layout/Layout"
import CustomerTable from "./pages/CustomerTable";
import Login from "./components/Authentication/Login";
import AddCustomer from "./pages/AddCustomer"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />, // remember that this will not inherit layout. nav bars are added conditionally if used is a logged in user
    children: [
      { path: "/", element: <CustomerTable /> },
      { path: "/customers", element: <CustomerTable />  },
      { path: "/add-customer", element: <AddCustomer /> },
    ],
  },
]);


function App() {

  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  return (
    <>
      {/* Initial state of the app, login with nothing else loading */}
      {!isAuthenticated && <Login />}
      {isAuthenticated && <RouterProvider router={router} />}
    </>
   
  )
}

export default App
