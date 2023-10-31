
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes> 
        <Footer />
      </>

  );
}

export default App;
