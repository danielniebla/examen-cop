import { ToDo } from "../models/ToDos";
import { toast } from "react-toastify"; 

const UpdateToDoController = async (todo: ToDo) => {
  const apiUrl = import.meta.env.VITE_URL;
  // Validar que el ToDo tenga los datos requeridos
  if (!todo || !todo.id || !todo.title || !todo.description ) {
    toast.error("Datos de To-Do incompletos. Asegúrate de llenar todos los campos.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${todo.id}`, {
      method: "PUT",
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

    toast.success("¡To-Do actualizado exitosamente!");
    return data;

  } catch (error: any) {
    console.error("Error al actualizar el To-Do:", error.message);
    toast.error(`No se pudo actualizar el To-Do`);
  }
};

export default UpdateToDoController;
