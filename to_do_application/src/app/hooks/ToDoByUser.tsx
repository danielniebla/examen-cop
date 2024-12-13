import { useState, useEffect } from 'react';
import { ToDo } from '../models/ToDos.tsx';  
import { useCtx } from '../useContext.tsx';

const useFetchYoDoByUser = (id: number) => {
  const apiUrl = import.meta.env.VITE_URL;
  const {todos, setTodos} = useCtx();
  
  
  const fetchTodos = () => {
    if (!apiUrl) {
      return;
    }


    fetch(`${apiUrl}user/${id}`)  
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las tareas");
        }
        return res.json();
      })
      .then((data: ToDo[]) => {
        console.log(data);
        setTodos(data);  
      })
      .catch((err) => {
        console.log(err.message) 
      })

  };

  useEffect(() => {
    fetchTodos();
  }, [id]);  

  return { todos};
};

export default useFetchYoDoByUser;
