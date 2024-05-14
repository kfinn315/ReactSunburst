import CssClassModifier from "../CssClassModifier"
import UndefinedArgumentError from "../UndefinedArgumentError"

export interface IHighlighter {
    addHighlight: (element: Element) => void
    removeHighlight: (element: Element) => void
}

export class Highlighter implements IHighlighter {
    private readonly classModifier: CssClassModifier
    constructor(className: string = 'highlight') {
        this.classModifier = new CssClassModifier(className)
    }

    addHighlight(element: Element): void {
        if (element == null) {
            throw new UndefinedArgumentError('element')
        }
        this.classModifier.addClassTo(element)
    }

    removeHighlight(element: Element): void {
        if (element == null) {
            throw new UndefinedArgumentError('element')
        }
        this.classModifier.removeClassFrom(element)
    }
}
