
import { Deserializable } from "./deserializable";

export class PersonalObservado implements Deserializable{

    DNI: string;
    APELLIDOS: string;
    NOMBRES: string;
    BEGDA: string;
    ENDDA: Date;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    get nombreCompleto(): string{
        return `${this.APELLIDOS} , ${this.NOMBRES}`;
    }
}
