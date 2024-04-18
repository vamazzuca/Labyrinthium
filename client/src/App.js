import { Routes, Route,  Navigate} from 'react-router-dom'
import Home from './pages/home';
import Navbar from './components/navbar';


function App() {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path="*" element={<Navigate to='/' />}></Route>
      </Routes>
    </>
  );
}

export default App;
