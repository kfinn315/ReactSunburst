import { SunburstItem } from "../../../Types"
import { TreeNode } from "../../TreeCreator"
import { getHierarchyNode } from "../getHierarchyNode"

import { HierarchyNode } from 'd3-hierarchy'

import { getValue } from "../getValue";
import { sortByValue } from "../sortByValue";

jest.mock('../getTreeNodeHierarchy', () => ({ getTreeNodeHierarchy: jest.fn() }))
import { getTreeNodeHierarchy } from "../getTreeNodeHierarchy"

describe('getHierarchyNode', () => {
    // it('should return a hierarchy node with the correct structure', () => {
    //     // Arrange
    //     const root: TreeNode<SunburstItem> = {
    //         id: 1,
    //         name: 'Root',
    //         data: { size: 100, color: 0, id: 0, name: '' },
    //         children: [
    //             {
    //                 id: 2,
    //                 name: 'Child1',
    //                 data: { size: 50, color: 0, id: 0, name: '' },
    //                 children: [],
    //             },
    //             {
    //                 id: 3,
    //                 name: 'Child2',
    //                 data: { size: 30, color: 0, id: 0, name: '' },
    //                 children: [],
    //             },
    //         ],
    //     }

    //     // Act
    //     const result = getHierarchyNode(root)

    //     // Assert
    //     expect(result).toBeDefined()
    //     expect(result.data).toBeDefined()
    //     expect(result.children).toHaveLength(2)
    //     expect(result.children?.[0].data.data?.size).toBe(50)
    //     expect(result.children?.[1].data.data?.size).toBe(30)
    // })

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

        const mockGetTreeNodeHierarchy = (getTreeNodeHierarchy as jest.Mock<(root: TreeNode<SunburstItem>) => HierarchyNode<TreeNode<SunburstItem>>>)
        mockGetTreeNodeHierarchy.mockImplementation(() => mockHierarchyNode)

        // Act
        getHierarchyNode(root)

        // Assert
        expect(getTreeNodeHierarchy).toHaveBeenCalledWith(root)
        expect(mockSum).toHaveBeenCalledWith(getValue)
        expect(mockSort).toHaveBeenCalledWith(sortByValue)


    })
})
