import { toast } from "react-toastify"; 

const DeleteToDoController = async (id: number) => {
    const apiUrl = import.meta.env.VITE_URL;


    try {
        const response = await fetch(`${apiUrl}${id}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
        });

        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
        throw new Error(`Error al actualizar el To-Do: ${response.statusText}`);
        }

        toast.success("¡To-Do Eliminado exitosamente!");

    } catch (error: any) {
        console.error("Error al eliminar el To-Do:", error.message);
        toast.error(`No se pudo eliminar el To-Do`);
    }
};

export default DeleteToDoController;
