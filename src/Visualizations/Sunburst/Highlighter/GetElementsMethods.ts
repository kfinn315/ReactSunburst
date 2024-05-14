
export default interface GetElementsMethods<T, E extends Element = Element> {
  getElementForItem: (item: T) => E | undefined;
  getAll: () => E[];
}
