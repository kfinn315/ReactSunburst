import { HierarchyNode } from 'd3-hierarchy'
import { mock } from 'jest-mock-extended'

import { SunburstItemTreeNode } from "../../../Types"
import { getHierarchyNode } from '../getHierarchyNode'

describe('getHierarchyNode', () => {
    it('should call getTreeNodeHierarchy, sum, and sort with the correct arguments', () => {
        // Arrange
        const root = mock<SunburstItemTreeNode>({
            children: []
        })

        const mockSort = jest.fn()
        const mockSum = jest.fn()

        //@ts-expect-error
        const mockHierarchyNode = mock<HierarchyNode<SunburstItemTreeNode>>({
            sort: (compare) => { mockSort(compare); return mockHierarchyNode },
            sum: (value) => { mockSum(value); return mockHierarchyNode }
        })

        const mockGetTreeNodeHierarchy = jest.fn().mockReturnValue(mockHierarchyNode)
        const mockGetValue = jest.fn();
        const mockCompare = jest.fn();

        // Act
        getHierarchyNode(root, mockGetTreeNodeHierarchy, mockGetValue, mockCompare)

        // Assert
        expect(mockGetTreeNodeHierarchy).toHaveBeenCalledWith(root)
        expect(mockSum).toHaveBeenCalledWith(mockGetValue)
        expect(mockSort).toHaveBeenCalledWith(mockCompare)
    })
})
