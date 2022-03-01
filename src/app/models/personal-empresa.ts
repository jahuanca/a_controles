import { Deserializable } from "./deserializable";

export class PersonalEmpresa implements Deserializable{

    codigoempresa: string;
    apellidopaterno: string;
    apellidomaterno: string;
    nombres: string;
    nrodocumento: string;
    fechamod: Date;
    idtipodocumento: string;
    fechaingreso: Date;
    bloqueado: boolean;
    fechacese: boolean;
    idusuario: number;
    itemgrupopersonal: number;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    get nombreCompleto(): string{
        return `${this.apellidopaterno} ${this.apellidomaterno}, ${this.nombres}`;
    }
}
