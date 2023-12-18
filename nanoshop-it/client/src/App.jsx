import { Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Producto from "./components/Products/Producto.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Prueba from "./components/Prueba/Prueba.jsx";

function App() {
  return (
      <>
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <NavBar />
                <Outlet />
                <Footer />
              </div>
            }>
            <Route path="/" element={<Home />} />
            <Route path={"/productos/:producto"} element={<Producto />} />
          </Route>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/prueba"} element={<Prueba />} />
          {/* <Route path={"/productos/:producto/:modelo"} element={<Modelo />} /> */}
        </Routes> 
      </>

  );
}

export default App;