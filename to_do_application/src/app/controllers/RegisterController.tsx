import { RegisterInterface } from "../models/Register";
const RegisterController = (Login: RegisterInterface, setUserCtx: any, navigate: any, toast: any) => {
  const apiUrl = import.meta.env.VITE_URL;

  fetch(apiUrl + "users", {
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
      console.log("Error de registro: " + err.message);
      toast.error("Error usuario en uso!");
      setUserCtx(null);
    })
    .then((data) => {
      if (data === undefined) return;
      setUserCtx(data); 
      console.log("Usuario Registrado y logueado correctamente");
      toast.success("Usuario registrado correctamente! Bienvenido!");
      navigate("/todos");  
    });
};

export { RegisterController };
