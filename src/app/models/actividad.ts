import { Deserializable } from "./deserializable";
import { Labor } from "./labor";

export class Actividad implements Deserializable {
    idactividad: number;
    actividad: string;
    descripcion: string;
    activo: boolean;
    esrendimiento: boolean;
    esjornal: boolean;
    idsociedad: number;
    idusuario: number;
    fechamod: Date;
    Labors: Labor[];

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        let a = input['Labors'] as [];
        this.Labors = [];
        for (let i = 0; i < a?.length; i++) {
            const element = a[i];
            this.Labors.push(
                new Labor().deserialize(element)
            );
        }
        return this;
    }

    get cantidadLabors(): string {
        return (this.Labors) ? `${this.Labors.length}` : '0';
    }

    get rendimiento(): String {
        return (this.esrendimiento) ? 'Rendimiento' : (this.esjornal) ? 'Jornal' : '-No registrado-';
    }

}
