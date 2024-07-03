import { Routes, Route,  Navigate} from 'react-router-dom'
import Home from './pages/home';
import Navbar from './components/navbar';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import MapRooms from './pages/map';
import Room from './pages/room';
import { useJsApiLoader } from '@react-google-maps/api';
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import UpdateModal from './components/modals/updateModal';
import SearchModal from './components/modals/searchModal';

const libraries = ['places']



function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
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
        <Route path="/profile/:username" element={<Profile/>}></Route>
        
      </Routes>
      <RegisterModal/>
      <LoginModal />
      <UpdateModal />
      {isLoaded ? <SearchModal /> : <></>}
      <ToastContainer/>
    </>
  );
}

export default App;
