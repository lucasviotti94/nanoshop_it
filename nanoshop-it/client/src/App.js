import { Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />

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
