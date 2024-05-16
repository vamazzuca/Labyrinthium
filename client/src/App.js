import { Routes, Route,  Navigate} from 'react-router-dom'
import Home from './pages/home';
import Navbar from './components/navbar';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import MapRooms from './pages/map';
import Room from './pages/room';
import { useJsApiLoader } from '@react-google-maps/api';
import Profile from './pages/profile';


const libraries = ['places']



function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAgDm2VJaq3_K8MqJh4Kfg9cP_BWA5a3xs",
    libraries,
  })
  
  return (
    <>
      <Navbar isLoaded={isLoaded}/>
      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />}></Route>
        <Route path="/map/:searchLocation?" element={<MapRooms isLoaded={isLoaded}/>}></Route>
        <Route path="*" element={<Navigate to='/' />}></Route>
        <Route path="/room/:id" element={<Room />}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        
      </Routes>
      <RegisterModal/>
      <LoginModal />
    </>
  );
}

export default App;
