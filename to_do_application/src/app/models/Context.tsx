import { User } from "./User.tsx";
import { ToDo } from "./ToDos.tsx";
interface UserContextType {
    user: User;  
    setUserCtx: React.Dispatch<React.SetStateAction<any>>;
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}
export type { UserContextType };