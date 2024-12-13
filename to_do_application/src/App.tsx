import './index.css';
import {  Route, Routes } from "react-router-dom";
import { Login } from './app/views/Login.tsx';
import { Home } from './app/views/Home.tsx';
import { useCtx } from './app/useContext.tsx';
import { Button } from './app/components/Button.tsx';
import ToDos from './app/views/ToDos.tsx';
import { Register } from './app/views/Register.tsx'; 
import { useNavigate } from "react-router-dom";  // Hook para navegación
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {user, setUserCtx} = useCtx();
  const navigate = useNavigate(); 
  const login = () => {
    navigate("/login");
  }
  const logout = () => {
    setUserCtx(null);
    navigate("/");
  }
  return (
    <div className="App">

        <header >
          <nav className='bg-primaryLight-dark dark:bg-primary-dark w-full p-2 flex justify-end' >
            <h1 className='text-primary-dark  dark:text-secondaryLight-light  m-auto'>{user? user.name: null}</h1>
                  <Button
                    text={user?"Salir":"Ingresar"}
                    onClick={user?logout:login}
                    size='large'
                  ></Button>
          </nav>
        </header>
        <div className='bg-primaryLight-light dark:bg-primary min-h-screen '>
        <Routes>

          <Route  path="/login" element={<Login />} />
          <Route  path="/" element={<Home />} />
          <Route  path="/todos" element={<ToDos />} />
          <Route  path="/register" element={<Register />} />

        </Routes>
        </div>
    </div>
  )
}

export default App
