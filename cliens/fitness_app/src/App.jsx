import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ProtectedRoute from "./protectedRoute";
import Redirect from "./Redirector";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
          }   
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;