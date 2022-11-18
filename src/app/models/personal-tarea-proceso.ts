import { DatePipe } from "@angular/common";
import { Actividad } from "./actividad";
import { Deserializable } from "./deserializable";
import { PersonalEmpresa } from "./personal-empresa";
import { TareaProceso } from "./tarea-proceso";

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
    /* Actividad: Actividad; */
    Personal_Empresa: PersonalEmpresa;
    TareaProceso: TareaProceso;
    Mensajesap: string;
    estadosap: string;

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        /* if(input['Actividad'])  this.Actividad= new Actividad().deserialize(input['Actividad']); */
        if(input['Personal_Empresa'])  this.Personal_Empresa= new PersonalEmpresa().deserialize(input['Personal_Empresa']);
        if(input['TareaProceso'])  this.TareaProceso= new TareaProceso().deserialize(input['TareaProceso']);
        return this;
    }

    get horaFormato(): String {

        return (this.horainicio && this.horafin) ? new DatePipe('en-US').transform(this.fechamod, 'd/M/yy')
            + '  ' + new DatePipe('en-US').transform(this.horainicio, 'shortTime') + ' - '
            + '  ' + new DatePipe('en-US').transform(this.horafin, 'shortTime')
            : '-No hay horas-';
    }

    get pausaFormato(): String {

        return (this.pausainicio && this.pausafin) ? new DatePipe('en-US').transform(this.pausainicio, 'shortTime') + ' - '
            + '  ' + new DatePipe('en-US').transform(this.pausafin, 'shortTime')
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
