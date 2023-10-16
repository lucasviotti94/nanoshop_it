import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />

        {/* <Route path="/">
          <Landing />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        <Route path="/">
          <Landing />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
