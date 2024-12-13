import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { LoginController } from "../controllers/LoginController";
import { LoginInterface } from "../models/Login";
import { useCtx } from "../useContext";
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { user, setUserCtx } = useCtx(); 
  const navigate = useNavigate(); 

  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Acceder a los valores del formulario
    const form = event.target as HTMLFormElement;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const loginData: LoginInterface = { username, password };

    LoginController(loginData, setUserCtx, navigate, toast);
  };
  const Register = () =>{
    navigate('/register');  
  }
  const Home = () =>{
    navigate('/');  
  }

  return (
    <div className="p-10">
      <div className="h-full w-full bg-primaryLight-dark dark:bg-primary-dark rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-primary-dark dark:border-primaryLight-light p-4">
        <form onSubmit={HandleSubmit} className="">
          <h2 className="text-primary-light dark:text-secondaryLight-light w-full flex justify-center">
            Ingresar
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
            <Button text="Entrar" size="large" type="submit"/>
            <Button text="Registrarme" onClick={Register} size="large"/>
            <Button text="Inicio" onClick={Home} size="large"/>
          </div>
          <ToastContainer/>
          </form>
      </div>
    </div>
  );
};

export { Login };
