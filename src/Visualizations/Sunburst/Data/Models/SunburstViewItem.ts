import { HasNumericColor } from "../../Types";

export default interface SunburstViewItem extends HasNumericColor {
    clickable?: boolean;
    name: string;
    id: number;
    color: number;
    arcColor: string;
    value: number;
}
