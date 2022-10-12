import { Deserializable } from "./deserializable";

export class CentroCosto implements Deserializable{
    idcentrocosto:      number;
    codigoempresa:      string;
    detallecentrocosto: string;
    idsociedad:         number;
    idtipocentrocosto:  number;
    homologacion:       string;
    activo:             boolean;
    fechamod:           Date;
    idusuario:          number;
    bukrs:              null;
    fechainicio:        null;
    fechabaja:          null;
    zfundo:             string;
    zetapa:             string;
    zcampo:             string;
    zturno:             string;
    zcultivo:           string;
    zvaried:            string;

    deserialize(input: any) {
        Object.assign(this, input);
        
        return this;
    }

}
