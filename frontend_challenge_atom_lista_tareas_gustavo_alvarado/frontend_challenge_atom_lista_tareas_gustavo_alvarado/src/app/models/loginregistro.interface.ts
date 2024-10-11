import { UsuarioI } from "./usuario.interface";

export interface ResgistroLoginI {
    status: String;
    message: String;
    data: UsuarioI;
}