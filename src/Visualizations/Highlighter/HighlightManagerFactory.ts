import HighlightManager, { IHighlightManager } from "./HighlightManager";
import { IHighlighter } from "./Highlighter";

export interface IHighlightManagerFactory {
    getHighlighter: (type: string) => IHighlightManager
}

export class HighlightManagerFactory implements IHighlightManagerFactory {
    private readonly highlighter: IHighlighter;

    constructor(highlighter: IHighlighter) {
        this.highlighter = highlighter;
    }

    getHighlighter(type: string): IHighlightManager {
        if (type === "module") {
            return new HighlightManager(this.highlighter);
        } else throw new Error("Could not return IHighlightManager because the requested type was not found.")
    }
}
