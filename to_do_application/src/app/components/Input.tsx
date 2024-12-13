import React from "react";
import { InputInterface } from "../models/Input.tsx";

const Input: React.FC<InputInterface> = ({
  name,
  id,
  type,
  value,
  placeholder,
  required,
  multiline = false,   
  rows = 2,            
}) => {
  return (
    <div className="relative z-0 my-2">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          defaultValue={value}          
          required={required}
          rows={rows}
          placeholder=" "
          className="peer block py-2 px-0 w-full text-sm text-primary-dark dark:text-secondaryLight-light bg-transparent border-0 border-b-2 border-secondary appearance-none dark:border-secondary-light dark:focus:border-secondary-light focus:outline-none focus:ring-0 focus:border-secondary-dark resize-none"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          defaultValue={value}          
          required={required}
          placeholder=" "
          className="peer block py-2 px-0 w-full text-sm text-primary-dark dark:text-secondaryLight-light bg-transparent border-0 border-b-2 border-secondary appearance-none dark:border-secondary-light dark:focus:border-secondary-light focus:outline-none focus:ring-0 focus:border-secondary-dark"
        />
      )}
      <label
        htmlFor={id}
        className="absolute text-sm text-primary-dark dark:text-secondaryLight-light duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-secondary-dark peer-focus:dark:text-secondary-light peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {placeholder}
      </label>
    </div>
  );
};

export { Input };
