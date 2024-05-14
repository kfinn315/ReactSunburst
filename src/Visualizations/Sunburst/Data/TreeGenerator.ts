import SegmentNode from "./Models/SegmentNode";
import TreeNode from "./Models/TreeNode";

export default class TreeGenerator {

    createTree<D>(name: string, data: D | undefined): TreeNode<D> {
        return this.createTreeNode(name, data, [])
    }

    addNodes<D>(treeNode: TreeNode<D>, nodes?: SegmentNode<D>[]) {
        nodes?.forEach(node => {
            this.addNodeToTree(treeNode, node.segments, node.data)
        })
        return treeNode;
    }

    private createTreeNode<D>(name: string, data: D | undefined, children: TreeNode<D>[] = []): TreeNode<D> {
        return { ...data, name, children };
    }

    private addNodeToTree<D>(treeNode: TreeNode<D>, segments: IterableIterator<string>, data: D): TreeNode<D> {
        const { iterator, segment: nextSegmentName } = this.getNextSegment(segments);
        if (nextSegmentName != null) {
            treeNode.children = this.updateChildren([...treeNode.children], nextSegmentName, iterator, data);
        } else {
            // treeNode.data = node.data
        }
        return treeNode
    }

    private getNextSegment(segments: IterableIterator<string>): { iterator: IterableIterator<string>, segment: string, done: boolean | undefined } {
        const { value, done } = segments.next()
        return { iterator: segments, segment: value, done }
    }

    private updateChildren<D>(children: TreeNode<D>[], segmentName: string, iterator: IterableIterator<string>, data: D): TreeNode<D>[] {
        const childTreeNode = this.findInChildren(children, segmentName);
        if (childTreeNode == null) {
            // childTreeNode doesn't exist so create it
            return [...children, this.createTree<D>(segmentName, data)]
        }
        //does exist
        const updatedChildTreeNode = this.addNodeToTree(childTreeNode, iterator, data)
        return [...children.filter(x => x.name !== segmentName), updatedChildTreeNode];
    }

    private findInChildren<D>(children: TreeNode<D>[], nextSegment: string): TreeNode<D> | undefined {
        return children?.find(x => x.name === nextSegment)
    }
}