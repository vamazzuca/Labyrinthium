import { Routes, Route,  Navigate} from 'react-router-dom'
import Home from './pages/home';
import Navbar from './components/navbar';
import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import Map from './pages/map';


function App() {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path="/map" exact Component={Map}></Route>
        <Route path="*" element={<Navigate to='/' />}></Route>
        
      </Routes>
      <RegisterModal/>
      <LoginModal />
    </>
  );
}

export default App;
