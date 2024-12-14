import React, { useState, useEffect } from "react";
import useFetchUserById from "../hooks/ToDoByUser";
import { useCtx } from "../useContext";
import { ToDo } from "../models/ToDos";
import { NewToDo } from "../models/NewToDo";
import { TbRosetteDiscountCheckOff, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ToastContainer, toast } from "react-toastify";
import UpdateToDoController from "../controllers/UpdateToDoController.tsx";
import NewToDoController from "../controllers/NewToDo";
import DeleteToDoController from "../controllers/DeleteToDoController.tsx";

const ToDos = () => {
  const { user, todos, setTodos } = useCtx();
  const [userId] = useState(user?.id);

  useFetchUserById(userId);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      [field]: field === "completed" ? e.target.checked : e.target.value,
    };
    setTodos(updatedTodos);
  };
  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const titleInput = form.elements.namedItem('title') as HTMLInputElement;
    const descriptionInput = form.elements.namedItem('description') as HTMLInputElement;
  
    const title = titleInput.value;
    const description = descriptionInput.value;
    const completed = false;
    const newToDo: NewToDo = { title, description, completed, userId };
    try {
      const newItem = await NewToDoController(newToDo);
      setTodos((prevTodos: ToDo[]) => [
        ...prevTodos,
        newItem 
      ]);
      titleInput.value = '';
      descriptionInput.value = '';
    } catch (error) {
      console.log(error);
      toast.error("Error al agregar todo" );
    }

  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
    event?.preventDefault()
    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem('title-'+id) as HTMLInputElement).value;
    const description = (form.elements.namedItem('description-'+id)as HTMLInputElement).value;
    const completed = (form.elements.namedItem('completed-'+id) as HTMLInputElement).checked;
    const todo : ToDo = { id, title, description, completed, userId };
    try {
       const updated = await UpdateToDoController(todo);
       setTodos((prevTodos: ToDo[]) =>
        prevTodos.map((t) => (t.id === todo.id ? { ...t, ...updated } : t))
      );
    } catch (error) {
      console.log(error);
      toast.error("Error al guardar los cambios" );
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await DeleteToDoController(id);
      setTodos((prevTodos: ToDo[]) => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el todo" );
    }
  }

  return (
    <div className="p-4">
      <h2 className="flex justify-center text-primary-dark dark:text-secondaryLight-light">
        To-Do`s de {user?.name}
      </h2>
      <form
            onSubmit={(event) => handleAdd(event)}
            className="grid gap-1 grid-cols-3 my-2 w-full bg-primaryLight-dark dark:bg-primary-dark rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-primary-dark dark:border-primaryLight-light p-4"
          >
             <Input
              placeholder="Título"
              id={"title"}
              name={"title"}
              type="text"
              required={true}
              multiline={true}
            />
            <Input
              placeholder="Descripción"
              id={"description"}
              name={"description"}
              type="text"
              required={true}
              multiline={true}
            />
            <div className="flex justify-center m-auto"> 
              <Button text="agregar" type="submit" />
            </div>
      </form>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <form
            key={todo.id}
            onSubmit={(event) => handleSave(event, todo.id)}
            className="grid gap-1 grid-cols-3 my-2 w-full bg-primaryLight-dark dark:bg-primary-dark rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-primary-dark dark:border-primaryLight-light p-4"
          >
            <Input
              placeholder="Título"
              id={"title-"+todo.id}
              name={"title-"+todo.id}
              type="text"
              required={true}
              value={todo.title}
              multiline={true}
            />
            <Input
              placeholder="Descripción"
              id={"description-"+todo.id}
              name={"description-"+todo.id}
              type="text"
              required={true}
              value={todo.description}
              multiline={true}
            />
              <div className="flex justify-around flex-wrap gap-1 my-auto">
                <label htmlFor={`completed-${todo.id}`} className="flex m-auto justify-around">
                  <input
                    type="checkbox"
                    id={`completed-${todo.id}`}
                    checked={todo.completed}
                    onChange={(e) => handleChange(e, index, "completed")}
                    className="hidden"
                  />
                  {todo.completed ? (
                    <p>
                      Tarea completa <TbRosetteDiscountCheckFilled className="m-auto" />
                    </p>
                  ) : (
                    <p>
                      Tarea incompleta <TbRosetteDiscountCheckOff className="m-auto" />
                    </p>
                  )}
                </label>
                <Button text="Guardar" type="submit"  />
                <Button text="Eliminar" onClick={() => handleDelete(todo.id)} />
              </div>
          </form>
        ))
      ) : (
        <p>No hay tareas disponibles.</p>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default ToDos;
