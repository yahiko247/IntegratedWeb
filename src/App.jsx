import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Header from "./component/header";
import Home from "./component/home";
import { AuthProvider } from "./context/authContext";
import Map from "./leafletmap/mapsample";
import BrgCertPage from "./page/BrgCertificate";
import BarangayOfficial from "./page/BrgOff";
import HousePage from "./page/nestedPages/house";
import Population from "./page/nestedPages/population";
import Youth from "./page/nestedPages/youth";
import BrgIndi from "./page/brgIndi";
import BarangayClearance from "./page/brgClearance";
import BarangayRecords from "./page/BrgRec";
import ZonPage from "./page/nestedPages/zone";


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
            <Route path="/official" element={<BarangayOfficial/>}/>
            <Route path="/indi" element={<BrgIndi/>}/>
            <Route path="/brgClea" element={<BarangayClearance/>}/>
            <Route path="/brgRec" element={<BarangayRecords/>}/>
            <Route path="/zone" element={<ZonPage/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
