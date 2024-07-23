import { HierarchyNode } from 'd3-hierarchy'

import { SunburstItem } from "../../../Types"
import { TreeNode } from "../../TreeCreator"
import { getHierarchyNode } from "../getHierarchyNode"
import { getValue } from "../getValue"
import { sortByValue } from "../sortByValue"

jest.mock('../getTreeNodeHierarchy', () => ({ getTreeNodeHierarchy: jest.fn() }))
import { getTreeNodeHierarchy } from "../getTreeNodeHierarchy"

describe('getHierarchyNode', () => {
    it('should call getTreeNodeHierarchy, sum, and sort with the correct arguments', () => {
        // Arrange
        const root: TreeNode<SunburstItem> = {
            id: 0,
            name: '',
            children: []
        }
        const mockSort = jest.fn()
        const mockSum = jest.fn()
        //@ts-ignore
        const mockHierarchyNode: HierarchyNode<TreeNode<SunburstItem>> = {
            sort: (compare) => { mockSort(compare); return mockHierarchyNode },
            sum: (value) => { mockSum(value); return mockHierarchyNode }
        }
        //@ts-ignore
        const mockGetTreeNodeHierarchy = (getTreeNodeHierarchy as jest.Mock<(root: TreeNode<SunburstItem>) => HierarchyNode<TreeNode<SunburstItem>>>)
        //@ts-ignore
        mockGetTreeNodeHierarchy.mockImplementation(() => mockHierarchyNode)

        // Act
        getHierarchyNode(root)

        // Assert
        expect(getTreeNodeHierarchy).toHaveBeenCalledWith(root)
        expect(mockSum).toHaveBeenCalledWith(getValue)
        expect(mockSort).toHaveBeenCalledWith(sortByValue)


    })
})
