
import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

//context
import { AuthProvider } from './context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Login/Login';
import Register from './Register/Register';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
