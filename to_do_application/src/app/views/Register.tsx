import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RegisterController } from "../controllers/RegisterController"; 
import { RegisterInterface } from "../models/Register";
import { useCtx } from "../useContext";
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const { user, setUserCtx } = useCtx(); 
  const navigate = useNavigate(); 

  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Acceder a los valores del formulario
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const loginData: RegisterInterface = { name, password };

    RegisterController(loginData, setUserCtx, navigate, toast);
  };
  const login = () =>{
    navigate('/login');  
  }
  const Home = () =>{
    navigate('/');  
  }

  return (
    <div className="p-10">
      
      <div className="h-full w-full bg-primaryLight-dark dark:bg-primary-dark rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-primary-dark dark:border-primaryLight-light p-4">
        <form onSubmit={HandleSubmit} className="">
          <h2 className="text-primary-light dark:text-secondaryLight-light w-full flex justify-center">
            Registrar usuario
          </h2>
          <Input
            placeholder="Nombre de usuario"
            id="username"
            name="username"
            type="text"
            required={true}
          />
          <Input
            placeholder="Contraseña"
            id="password"
            name="password"
            type="password"
            required={true}
          />
          <div className="flex flex-wrap">
            <Button text="Registrar" size="large" type="submit"/>
            <Button text="Ingresar con mi usuario" onClick={login} size="large"/>
            <Button text="Inicio" onClick={Home} size="large"/>
          </div>
          </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export { Register };
