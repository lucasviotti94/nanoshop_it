import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./components/Carrito/carritoContexto.jsx";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
