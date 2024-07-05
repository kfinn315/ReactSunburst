import { HierarchyRectangularNode } from 'd3';
import { TreeNode } from '../Types';
import Dimensions from '../../Shared/Dimensions';

export default interface IPartitionLayout<T> {
    getLayout: (root: TreeNode<T>, layoutSize: Dimensions) => Array<HierarchyRectangularNode<TreeNode<T>>>;
}
