import { HierarchyNode } from "d3";
import { getRootHierarchyNode } from "../getRootHierarchyNode";
import { TreeNode } from "../../TreeCreator";
import { mock } from "jest-mock-extended";

type T = { name: string }

describe("getRootHierarchyNode", () => {
    // Define test data
    const items: T[] = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];

    // Mock functions for createTree and getHierarchyNode
    const createTree = jest.fn(() => {
        /* Mock implementation for createTree */
        return mock<TreeNode<T>>()
    });

    const getHierarchyNode = jest.fn(() => {
        /* Mock implementation for getHierarchyNode */
        return mock<HierarchyNode<TreeNode<T>>>()
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call createTree with the correct items", () => {
        getRootHierarchyNode(items, createTree, getHierarchyNode);

        expect(createTree).toHaveBeenCalledTimes(1);
        expect(createTree).toHaveBeenCalledWith(items);
    });

    it("should call getHierarchyNode with the root node returned by createTree", () => {
        const rootNode: TreeNode<T> = mock<TreeNode<T>>()
        createTree.mockReturnValueOnce(rootNode);

        getRootHierarchyNode(items, createTree, getHierarchyNode);

        expect(getHierarchyNode).toHaveBeenCalledTimes(1);
        expect(getHierarchyNode).toHaveBeenCalledWith(rootNode);
    });

    it("should return the result of getHierarchyNode", () => {
        const hierarchyNode = mock<HierarchyNode<TreeNode<T>>>()
        getHierarchyNode.mockReturnValueOnce(hierarchyNode);

        const result = getRootHierarchyNode(items, createTree, getHierarchyNode);

        expect(result).toBe(hierarchyNode);
    });
});
