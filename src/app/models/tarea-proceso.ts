import { Actividad } from "./actividad";
import { CentroCosto } from "./centro-costo";
import { Deserializable } from "./deserializable";
import { Labor } from "./labor";
import { PersonalEmpresa } from "./personal-empresa";

export class TareaProceso implements Deserializable{
    itemtareoproceso: number;
    codigoempresasupervisor: string;
    codigoempresadigitador: string;
    fecha: Date;
    idactividad: number;
    idlabor: number;
    idcentrocosto: number;
    turnotareo: string;
    fechamod: Date;
    idusuario: number;
    idestado: number;
    escampo: boolean;
    espacking: boolean;
    esjornal: boolean;
    esrendimiento: boolean;
    horainicio: Date;
    horafin: Date;
    pausainicio: Date;
    pausafin: Date;
    diasiguiente: boolean;
    firmasupervisor: string;
    Labor: Labor;
    Actividad: Actividad;
    Centro_Costo: CentroCosto;
    Digitador: PersonalEmpresa;
    Supervisor: PersonalEmpresa;

    deserialize(input: any) {
        Object.assign(this, input);
        if(input['Actividad'])  this.Actividad= new Actividad().deserialize(input['Actividad']);
        if(input['Labor'])  this.Labor= new Labor().deserialize(input['Labor']);
        if(input['Centro_Costo'])  this.Centro_Costo= new CentroCosto().deserialize(input['Centro_Costo']);
        if(input['Digitador'])  this.Digitador= new PersonalEmpresa().deserialize(input['Digitador']);
        if(input['Supervisor'])  this.Supervisor= new PersonalEmpresa().deserialize(input['Supervisor']);
        return this;
    }

    toString(){
        return ``;
    }
}
