import { Deserializable } from "./deserializable";

export class CentroCosto implements Deserializable{

    idcentrocosto: number;
    detallecentrocosto: string;
    idsociedad: number;
    idtipocentrocosto: number;
    homologacion: string;
    activo: number;
    bukrs: string;
    fechainicio: Date;
    fechabaja: Date;
    /*zfundo: string;
    zetapa: string;
    zcampo: string;
    zturno: string;
    zvaried: string;
   */
    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
