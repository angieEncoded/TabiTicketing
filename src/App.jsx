import 'react-toastify/dist/ReactToastify.css';
import "./css/App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./layout/Layout"
import CustomerTable from "./pages/CustomerTable";
import Login from "./components/Authentication/Login";
import AddCustomer from "./pages/AddCustomer"
import AddTicket from './pages/AddTicket';
import History from './pages/History';
import AddUser from './pages/AddUser';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Backup from './pages/Backup';
import Testing from './pages/Testing';
import TicketQueue from './pages/TicketQueue';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />, // remember that this will not inherit layout. nav bars are added conditionally if used is a logged in user
    children: [
      { path: "/", element: <CustomerTable /> },
      { path: "/customers", element: <CustomerTable />  },
      { path: "/add-customer", element: <AddCustomer /> },
      { path: "/add-user", element: <AddUser /> },
      { path: "/reports", element: <Reports /> },
      { path: "/settings", element: <Settings /> },
      { path: "/history", element: <History /> },
      { path: "/add-ticket", element: <AddTicket /> },
      { path: "/backup", element: <Backup /> },
      { path: "/queue", element: <TicketQueue /> },
      { path: "/testing", element: <Testing /> },
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
