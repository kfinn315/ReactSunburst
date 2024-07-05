import { hierarchy, HierarchyNode, HierarchyRectangularNode, partition, PartitionLayout } from 'd3';
import { TreeNode } from '../Types';
import UndefinedArgumentError from '../../Shared/UndefinedArgumentError';
import Dimensions from '../../Shared/Dimensions';
import IPartitionLayout from './IPartitionLayout';

export default class D3HierarchyPartitionLayout<T> implements IPartitionLayout<T> {
    constructor(
        private readonly getChildren: ((d: TreeNode<T>) => Iterable<TreeNode<T>> | null | undefined),
        private readonly getHierarchySum: (d: TreeNode<T>) => number,
        private readonly sortHierarchyNodes: (nodeA: HierarchyNode<TreeNode<T>>, nodeB: HierarchyNode<TreeNode<T>>) => number) {
    }

    getLayout(root: TreeNode<T>, layoutSize: Dimensions): Array<HierarchyRectangularNode<TreeNode<T>>> {
        if (root == null) {
            throw new UndefinedArgumentError('root')
        }
        if (layoutSize == null) {
            throw new UndefinedArgumentError('layoutSize')
        }
        const rootHierarchyNode = this.getHierarchy(root);
        const partitionLayout = this.getPartition(layoutSize);
        const partition = this.layoutRoot(partitionLayout, rootHierarchyNode);
        return partition.descendants()
    }

    private getHierarchy(treeNode: TreeNode<T>): HierarchyNode<TreeNode<T>> {
        return hierarchy(treeNode, this.getChildren);
    }

    private getPartition(layoutSize: Dimensions): PartitionLayout<TreeNode<T>> {
        return partition<TreeNode<T>>().size([layoutSize.width, layoutSize.height]);
    }

    private layoutRoot(partitionLayout: PartitionLayout<TreeNode<T>>, rootHierarchyNode: HierarchyNode<TreeNode<T>>): HierarchyRectangularNode<TreeNode<T>> {
        rootHierarchyNode.sum(this.getHierarchySum).sort(this.sortHierarchyNodes)
        return partitionLayout(rootHierarchyNode);
    }
}
