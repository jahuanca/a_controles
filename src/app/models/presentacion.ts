import { Deserializable } from "./deserializable";

export class Presentacion implements Deserializable{

    idpresentacion: number;
    descripcion: string;
    codigoempresa: string;
   

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

  
}
