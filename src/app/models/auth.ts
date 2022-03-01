import { Deserializable } from "./deserializable";
import { UsuarioPerfil } from "./usuario-perfil";

export class Auth implements Deserializable{
    alias: String;
    password: String;
    idsubdivision: number=7;
    Usuario_Perfil: UsuarioPerfil;
    token: string;

    deserialize(input: any) {
        Object.assign(this, input);

        return this;
    }

}
