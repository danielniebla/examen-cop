import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserContextType } from './models/Context.tsx';

// Crea el contexto con un valor inicial de null
const ctx = createContext<UserContextType | null>(null);

// CtxProvider para proporcionar el contexto a los componentes hijos
export const CtxProvider = ({ children }: { children: React.ReactNode }) => {
    // Recuperar user desde localStorage si está disponible
    const storedUser = localStorage.getItem('user');
    
    const [user, setUserCtx] = useState<any>(storedUser ? JSON.parse(storedUser) : null);
    const [todos, setTodos] = useState<any[]>([]);

    // Guardar en localStorage cada vez que el user cambie
    useEffect(() => {
        if (user !== null) {
            localStorage.setItem('user', JSON.stringify(user)); // Guardamos solo el user
        } else {
            localStorage.removeItem('user'); // Si no hay usuario, eliminamos de localStorage
        }
    }, [user]);

    // Si el usuario cambia, obtener los todos de la API 
    useEffect(() => {
        if (user) {
            fetchTodos(user.id); // Obtener los todos solo cuando haya un usuario
        }
    }, [user]);

    // Función para obtener los todos del usuario desde una API (ejemplo)
    const fetchTodos = (userId: number) => {
        const apiUrl = import.meta.env.VITE_URL;
        
        fetch(`${apiUrl}user/${userId}`) 
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((err) => {
                console.error('Error al obtener todos:', err);
            });
    };

    return (
        <ctx.Provider value={{ user, setUserCtx, todos, setTodos }}>
            {children}
        </ctx.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useCtx = () => {
    const context = useContext(ctx);
    if (!context) {
        throw new Error('useCtx must be used within a CtxProvider');
    }
    return context;
};
