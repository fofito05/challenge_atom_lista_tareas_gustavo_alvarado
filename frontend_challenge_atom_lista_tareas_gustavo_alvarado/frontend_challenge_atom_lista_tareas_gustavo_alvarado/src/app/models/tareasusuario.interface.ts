import { TareasI } from "./tareas.interface";

export interface TareasUsuarionI {
    status: String;
    message: String;
    id:string;
    data: TareasI;
}