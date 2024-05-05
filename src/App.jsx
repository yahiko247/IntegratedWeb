import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Header from "./component/header";
import Home from "./component/home";
import { AuthProvider } from "./context/authContext";
import Map from "./leafletmap/mapsample";
import BrgCertPage from "./page/BrgCertificate";




function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
       
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<Map/>}/>
            <Route path="/cert" element={<BrgCertPage/>}/>
          </Routes>
        
      </AuthProvider>
    </Router>
  );
}

export default App;
