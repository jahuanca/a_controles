import { Deserializable } from "./deserializable";

export class Absentismo implements Deserializable{
    codigosap:      string;
    nombrecompleto: string;
    codigo:      string;
    descripcion:        string;
    fechainicio:        Date;
    fechafin:        Date;
    					
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
