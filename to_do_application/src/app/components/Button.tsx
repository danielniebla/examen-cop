import React from "react";
import { ButtonInterface } from "../models/Button.tsx";

const Button: React.FC<ButtonInterface> = ({
    text,
    onClick,
    disabled=false,
    size = "medium",
    type = "button", 
}) => {
    
    const sizeClasses = {
        small: "btn-small",
        medium: " text-primaryLight-light  dark:text-secondaryLight-light bg-secondary-dark  dark:bg-primary-light mx-2 p-2 rounded-lg",
        large: "text-primaryLight-light  dark:text-secondaryLight-light bg-secondary-dark  dark:bg-primary-light px-6 mx-2 p-2 rounded-lg",
    };
    return <div>
        <button
            onClick={onClick}
            disabled={disabled}
            className={` ${sizeClasses[size]}`}
            type={type}
        >
            {text}
        </button>
    </div>
};

export { Button };