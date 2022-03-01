import { Cultivo } from "./cultivo";
import { Deserializable } from "./deserializable";
import { Subdivision } from "./subdivision";

export class PreTareoProcesoUva implements Deserializable{
    itempretareaprocesouva: number;
    fecha: Date;
    horainicio: Date;
    horafin: Date;
    pausainicio: Date;
    pausafin: Date;
    linea: number;
    idcentrocosto: number;
    idcultivo: number;
    diasiguiente: boolean;
    turnotareo: string;
    idestado: number;
    codigoempresasupervisor: string;
    codigoempresadigitador: string;
    idusuario: number;
    Cultivo:Cultivo;
    Subdivision: Subdivision;

    centroCosto: String;
    cultivo: String;
    detalles: number;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        if(input['Cultivo']) this.Cultivo= new Cultivo().deserialize(input['Cultivo']);
        if(input['Centro_Costo']) this.Subdivision= new Subdivision().deserialize(input['Centro_Costo']);
        return this;
    }

    get turno() : String{
        return (this.turnotareo == 'D') ? 'Dia' : 'Noche';
    }


}
