import { LoginInterface } from "../models/Login";

const LoginController = (Login: LoginInterface, setUserCtx: any, navigate: any, toast: any) => {
  const apiUrl = import.meta.env.VITE_URL;

  

  fetch(apiUrl + "users/login", {
    method: "POST",
    body: JSON.stringify(Login),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error al realizar la petición: ${res.statusText}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.log("Credenciales no válidas: " + err.message);
      toast.error("Credenciales no validas");
      setUserCtx(null);
    })
    .then((data) => {
      if (data === undefined) return;
      setUserCtx(data); 
      console.log("Usuario logueado correctamente");
      toast.success("Usuario logueado correctamente! Bienvenido!");  
      navigate("/todos"); 
    });
};

export { LoginController };
