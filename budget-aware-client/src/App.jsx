import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/index.jsx";
import { Toaster } from "react-hot-toast";

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
