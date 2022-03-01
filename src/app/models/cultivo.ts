import { Deserializable } from "./deserializable";

export class Cultivo  implements Deserializable{
    idcultivo: number;
    detallecultivo: string;
    cultivo: string;

    constructor(){}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
