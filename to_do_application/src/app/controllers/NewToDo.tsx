import { NewToDo } from "../models/NewToDo";
import { toast } from "react-toastify"; 
import { ToDo } from "../models/ToDos";

const NewToDoController = async (todo: NewToDo) => {
    const api = import.meta.env.VITE_URL;
    const apiUrl = api.slice(0, -1);
    console.log(apiUrl);
    console.log(todo);
    // Validar que el ToDo tenga los datos requeridos
    if (!todo  || !todo.title || !todo.description ) {
        toast.error("Datos de To-Do incompletos. Asegúrate de llenar todos los campos.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        });

        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
        throw new Error(`Error al actualizar el To-Do: ${response.statusText}`);
        }

        const data = await response.json();

        

        toast.success("¡To-Do agregado exitosamente!");
        return data;

    } catch (error: any) {
        console.error("Error al agregar el To-Do:", error.message);
        toast.error(`No se pudo agregar el To-Do`);
    }
};

export default NewToDoController;
