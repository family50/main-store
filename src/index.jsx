import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "./main.jsx"; // استدعي Main بعد ما جمعت فيه كل state
import './home.css';
import './header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById("root")).render(


  <BrowserRouter >
  
    <Main />
  </BrowserRouter>

);
