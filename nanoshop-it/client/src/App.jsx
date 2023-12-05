import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Producto from "./components/Products/Producto";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
      <>
        <Routes>
          <div>
            <NavBar />
            <Route path="/" element={<Home />} />
            <Route path={"/productos/:producto"} element={<Producto />} />
            <Footer />
          </div>
          {/* <Route path={"/productos/:producto/:modelo"} element={<Modelo />} /> */}
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Routes> 
      </>

  );
}

export default App;
