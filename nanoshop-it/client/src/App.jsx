
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes> 
        
      </>

  );
}

export default App;
