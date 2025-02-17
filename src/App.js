import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import  {onAuthStateChanged} from 'firebase/auth';//mapeia o estado do usuário

//hooks
import {useState,useEffect} from 'react';
import { useAuthentication } from './hooks/useAuthentication';
//context
import { AuthProvider } from './context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Login/Login';
import Register from './Register/Register';
import CreatePost from './pages/CreatePost/CreatePost'; 
import Dashboard from './pages/Dashboard/Dashboard';


function App() {
  const [user,setUser] = useState(undefined);//estado do usuário
  const {auth}=useAuthentication();//hook para autenticação
  const loadingUser = user === undefined;//se o usuário for indefinido o loading é verdadeiro
  useEffect(() => {
    if (!auth) {
      console.log('Auth not initialized');
      return; // Certifique-se de que auth está inicializado
    }

    console.log('Auth initialized:', auth);

    const unsubscribe = onAuthStateChanged(auth, (user) => { // verifica se o usuário está logado
      console.log('User state changed:', user);
      setUser(user); // seta o usuário
    });

    return () => {
      unsubscribe(); // limpa o unsubscribe
    };
  }, [auth]);

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  };

  if (loadingUser) {
    console.log('Loading user...');
    return <div>Carregando...</div>;
  }

  console.log('User loaded:', user);


  return (
    <div className="App">
      <AuthProvider value = {{user}}>{/*envolve a aplicação com o contexto de autenticação*/}
        <BrowserRouter>
          <Navbar user={user} logout={logout} />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={!user ?  <Login/>: <Navigate to = "/"/>}/>
            <Route path="/register" element={!user ?  <Register/>: <Navigate to = "/"/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/create-post" element={user ?  <CreatePost/>: <Navigate to = "/login"/>}/>
            <Route path="/dashboard" element={user ?  <Dashboard/>: <Navigate to = "/login"/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
