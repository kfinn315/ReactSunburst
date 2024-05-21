
type SegmentNode<T> = {
    segments: IterableIterator<string>;
    data: T;
};
export default SegmentNode;
