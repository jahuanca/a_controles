import { Deserializable } from "./deserializable";

export class UsuarioPerfil implements Deserializable{

    idusuario:     number;
    idPerfil:      number;
    idsubdivision: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
