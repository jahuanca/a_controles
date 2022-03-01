import { Actividad } from "./actividad";
import { Cultivo } from "./cultivo";
import { Deserializable } from "./deserializable";
import { Labor } from "./labor";
import { PreTareoProcesoUva } from "./pre-tareo-proceso-uva";

export class PreTareoProcesoUvaDetalle implements Deserializable{

    itempretareoprocesouvadetalle:number;
    codigoempresa:string;
    itempretareaprocesouva:number;
    numcaja:number;
    fecha:Date;
    hora:Date;
    imei:string;
    idusuario:number;
    idlabor:number;
    idactividad:number;
    idpresentacion:number;
    idestado:number;
    codigotk:string;

    Labor: Labor;
    Actividad: Actividad;
    Pre_Tareo_Proceso_Uva: PreTareoProcesoUva;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        this.Actividad= new Actividad().deserialize(input['Actividad']);
        this.Labor= new Labor().deserialize(input['Labor']);
        this.Pre_Tareo_Proceso_Uva= new PreTareoProcesoUva().deserialize(input['Pre_Tareo_Proceso_Uva']);
        return this;
    }
}
