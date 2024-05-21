
export default interface IGetElements<T, E extends Element = Element> {
  forItem: (item: T) => E | undefined;
  getAll: () => E[];
}
