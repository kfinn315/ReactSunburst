export function* idGenerator(): Generator<number, void> {
    let index = 0;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
        yield index++;
    }
}
