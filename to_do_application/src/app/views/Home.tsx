import React from "react";
import useFetchUsers from "../hooks/users.tsx";

const Home = () => {
    const {Users}= useFetchUsers();
    return  (<div className="p-10">
        <div className = "h-full w-full bg-primaryLight-dark dark:bg-primary-light rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-primary-dark dark:border-primaryLight-light p-4">
            <h2 className="text-primary-dark  dark:text-secondaryLight-light">Usuarios que disfrutan esta app:</h2>
            <ul>
            {Users.map(user =>(
            <li key={user.id} className="text-primary-dark  dark:text-secondaryLight-light">{user.name}</li>))}
            </ul>
        </div >
    </div>   
    )
};
export {Home};