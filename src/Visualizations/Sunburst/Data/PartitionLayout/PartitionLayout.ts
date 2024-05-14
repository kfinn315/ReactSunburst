import { hierarchy, HierarchyNode, HierarchyRectangularNode, partition, PartitionLayout } from 'd3';
import { Dimensions } from '../../../D3Types';
import TreeNode from '../Models/TreeNode';
import UndefinedArgumentError from '../../../UndefinedArgumentError';

export interface IPartitionLayout<T> {
    getLayout: (root: TreeNode<T>, layoutSize: Dimensions) => Array<HierarchyRectangularNode<TreeNode<T>>>
}

export default class PartitionLayout0<T> implements IPartitionLayout<T> {
    constructor(
        private readonly getChildrenMethod: ((d: TreeNode<T>) => Iterable<TreeNode<T>> | null | undefined),
        private readonly hierarchySumMethod: (d: TreeNode<T>) => number,
        private readonly hierarchyNodeSortMethod: (nodeA: HierarchyNode<TreeNode<T>>, nodeB: HierarchyNode<TreeNode<T>>) => number) {
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
        return hierarchy(treeNode, this.getChildrenMethod);
    }

    private getPartition(layoutSize: Dimensions): PartitionLayout<TreeNode<T>> {
        return partition<TreeNode<T>>().size([layoutSize.width, layoutSize.height]);
    }

    private layoutRoot(partitionLayout: PartitionLayout<TreeNode<T>>, rootHierarchyNode: HierarchyNode<TreeNode<T>>): HierarchyRectangularNode<TreeNode<T>> {
        rootHierarchyNode.sum(this.hierarchySumMethod).sort(this.hierarchyNodeSortMethod)
        return partitionLayout(rootHierarchyNode);
    }
}
