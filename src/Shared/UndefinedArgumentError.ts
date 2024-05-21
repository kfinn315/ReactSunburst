export default class UndefinedArgumentError extends Error {
    constructor(...argumentNames: string[]) {
        argumentNames = argumentNames?.filter(x => x != null)
        if (argumentNames == null || argumentNames.length === 0) {
            super("Argument is undefined")
        } else if (argumentNames.length === 1) {
            super("Argument " + argumentNames[0] + " is undefined")
        } else {
            super("Arguments " + argumentNames.join(", ") + " are undefined")
        }
    }
}
