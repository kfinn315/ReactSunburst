import SegmentNode from "./Models/SegmentNode";
import TreeNode from "./Models/TreeNode";
import TreeGenerator from './TreeGenerator';

export default class Tree<D> {
    public rootNode: TreeNode<D>;
    private treeGenerator: TreeGenerator;
    constructor(name: string, data: D | undefined) {
        this.treeGenerator = new TreeGenerator()
        this.rootNode = this.treeGenerator.createTree<D>(name, data);
    }

    addNodes(nodes?: SegmentNode<D>[]) {
        this.rootNode = this.treeGenerator.addNodes(this.rootNode, nodes)
    }
}
