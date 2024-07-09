import { HierarchyRectangularNode } from 'd3';
import { TreeNode } from '../Tree/Types';
import BoxDimensions from '../Shared/BoxDimensions';

export default interface MyPartitionLayout<T> {
    getLayout: (root: TreeNode<T>, layoutSize: BoxDimensions) => Array<HierarchyRectangularNode<TreeNode<T>>>;
}
