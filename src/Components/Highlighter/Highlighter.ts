import CollectionClassModifier, { ICollectionClassModifier } from "../../Shared/CSSClassModifier/CollectionClassModifier";

export default class Highlighter extends CollectionClassModifier implements ICollectionClassModifier {
    constructor() {
        super("highlight");
    }
}
