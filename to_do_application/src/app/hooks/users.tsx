import { useState, useEffect } from 'react';
import { User } from '../models/User.tsx';

const useFetchUsers = () => {
    const apiUrl = import.meta.env.VITE_URL;
    console.log(apiUrl); 

    // Tipamos Users como un arreglo de User
    const [Users, setUsers] = useState<User[]>([]);  

    const fetchUsers = () => {
        if (!apiUrl) {
            console.error("API URL no está definida");
            return;
        }
        fetch(apiUrl+"users")
        .then((res) => res.json())
        .then((data: User[]) => {  
            setUsers(data);  
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);  

    return { Users, setUsers }; 
};

export default useFetchUsers;
