import { DatePipe } from "@angular/common";
import { Actividad } from "./actividad";
import { Deserializable } from "./deserializable";
import { PersonalEmpresa } from "./personal-empresa";
import { TareoProceso } from "./tareo-proceso";

export class PersonalTareaProceso implements Deserializable {

    item: number;
    itemtareoproceso: number;
    codigoempresa: string;
    transferidosap: boolean;
    horainicio: Date;
    horafin: Date;
    pausainicio: Date | null;
    pausafin: Date | null;
    fechafin: Date | null;
    fechainicio: Date | null;
    turno: null | string;
    diasiguiente: boolean | null;
    esrendimiento: boolean | null;
    esjornal: boolean | null;
    fechamod: Date;
    cantidadhoras: number;
    cantidadrendimiento: number;
    cantidadavance: number;
    idestado: number;
    idusuario: number;
    idactividad: number;
    Actividad: Actividad;
    Personal_Empresa: PersonalEmpresa;
    TareaProceso: TareoProceso;
    Mensajesap: string;
    estadosap: string;

    pipe = new DatePipe('en-US');

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        if(input['Actividad'])  this.Actividad= new Actividad().deserialize(input['Actividad']);
        if(input['TareaProceso'])  this.TareaProceso= new TareoProceso().deserialize(input['TareaProceso']);
        if(input['Personal_Empresa'])  this.Personal_Empresa= new PersonalEmpresa().deserialize(input['Personal_Empresa']);
        return this;
    }

    get horaFormato(): String {

        return (this.horainicio && this.horafin) ? this.pipe.transform(this.horainicio, 'shortDate')
            + '  ' + this.pipe.transform(this.horainicio, 'shortTime') + ' - '
            + '  ' + this.pipe.transform(this.horafin, 'shortTime')
            : '-No hay horas-';
    }

    get pausaFormato(): String {

        return (this.pausainicio && this.pausafin) ? this.pipe.transform(this.pausainicio, 'shortTime') + ' - '
            + '  ' + this.pipe.transform(this.pausafin, 'shortTime')
            : '-No hay pausas-';
    }

    get turnoCompleto(): String{
        return this.turno.trim().toUpperCase() == 'D' ? 'Día' : 'Noche';
    }
    
    get estadoSap() : string{
        switch(this.estadosap){
            case null: return 'Sin migrar';
            case 'E': return 'Error al migrar';
            case 'T': return 'Transferido';
        }
    }

}
