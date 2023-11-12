import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Producto from "./components/Products/Producto";

function App() {
  return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/productos/:producto"} element={<Producto />} />
          {/* <Route path={"/productos/:producto/:modelo"} element={<Modelo />} /> */}
        </Routes> 
        <Footer />
      </>

  );
}

export default App;
