// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import FrontendRouter from "./containers/FrontendRouter";
import AdminRouter from "./containers/Admin/AdminRouter";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          
          <FrontendRouter />
          <AdminRouter />
       </BrowserRouter>
    </div>
  );
}

export default App;
