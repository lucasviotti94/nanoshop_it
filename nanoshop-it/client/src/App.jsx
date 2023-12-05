import { Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Producto from "./components/Products/Producto";
import Dashboard from "./components/Dashboard/Dashboard";

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
          {/* <Route path={"/productos/:producto/:modelo"} element={<Modelo />} /> */}
        </Routes> 
      </>

  );
}

export default App;