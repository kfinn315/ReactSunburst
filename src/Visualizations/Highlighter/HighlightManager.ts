
import UndefinedArgumentError from "../UndefinedArgumentError";
import { HighlightManagerFactory } from "./HighlightManagerFactory";
import { Highlighter, IHighlighter } from "./Highlighter";

export interface IHighlightManager {
    removeHighlights: (elements: Element[]) => void
    addHighlight: (elements: Element[]) => void
}

export default class HighlightManager implements IHighlightManager {
    private readonly highlighter: IHighlighter;

    constructor(highlighter: IHighlighter) {
        this.highlighter = highlighter;
    }

    addHighlight(elements: Element[]): void {
        if (elements == null) throw new UndefinedArgumentError('elements');
        elements.forEach(element => { this.highlighter.addHighlight(element); })
    }

    removeHighlights(elements: Element[]): void {
        if (elements == null) throw new UndefinedArgumentError('elements');
        elements.forEach(element => { this.highlighter.removeHighlight(element); })
    }
}

export const defaultHighlightManager = new HighlightManagerFactory(new Highlighter()).getHighlighter('module')
