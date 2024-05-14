import { HasNumericColor } from "../../Types";


export default interface SunburstDataDTO extends HasNumericColor {
    additional?: unknown;
    clickable?: boolean;
    color: number;
    id: number; //must be unique
    name: string;
    size: number;
}
