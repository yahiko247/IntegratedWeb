import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Header from "./component/header";
import Home from "./component/home";
import { AuthProvider } from "./context/authContext";
import Map from "./leafletmap/mapsample";
import BrgCertPage from "./page/BrgCertificate";
import HousePage from "./page/nestedPages/house";
import Population from "./page/nestedPages/population";
import Youth from "./page/nestedPages/youth";
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
            <Route path="/houses" element={<HousePage/>}/>
            <Route path="/population" element={<Population/>}/>
            <Route path="/youth" element={<Youth/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
