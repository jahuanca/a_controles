import { Deserializable } from "./deserializable";
import { UsuarioPerfil } from "./usuario-perfil";

export class Usuario implements Deserializable {
    idusuario:        number;
    idtipodocumento:  number;
    alias:            string;
    password:         string;
    apellidosnombres: string;
    nrodocumento:     string;
    email:            string;
    area:             string;
    activo:           number;
    fechamod:         Date;
    token:            string;
    Usuario_Perfils:  UsuarioPerfil[];

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        let a=input['Usuario_Perfils'] as [];
        for (let i = 0; i < a?.length; i++) {
            const element = a[i];
            this.Usuario_Perfils.push(
                new UsuarioPerfil().deserialize(element)
            );
        }
        return this;
    }

}