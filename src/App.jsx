import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout"
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';
import "./css/App.css"

function App() {


  return (
    <>
      < BrowserRouter >
          <Layout>
            <Routes>

              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/customers" element={<LandingPage />} />

            </Routes>

            {/* Add the toast container once with our chosen details and we can call it from anywhere in the app */}
            <ToastContainer
              transition={Flip}
              position="top-right"
              autoClose={20000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

          </Layout>
        </BrowserRouter>

    </>
  )
}

export default App
