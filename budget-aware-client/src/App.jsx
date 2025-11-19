import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/index.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./redux/services/authApi.js";

function App() {
  return (  
    <>
     <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
