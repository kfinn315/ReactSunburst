import { SunburstItem } from "../../../Types"
import { TreeNode } from "../../TreeCreator"
import { sortByValue } from "../sortByValue"

describe('sortByValue', () => {
    it('should return a positive number if the value of nodeB is larger', () => {
        // Arrange
        const nodeA: TreeNode<SunburstItem> = {
            id: 1,
            name: 'NodeA',
            data: { size: 50, color: 0, id: 0, name: '' },
            children: [],
        }

        const nodeB: TreeNode<SunburstItem> = {
            id: 2,
            name: 'NodeB',
            data: { size: 100, color: 0, id: 0, name: '' },
            children: [],
        }

        // Act
        const result = sortByValue({ data: nodeA }, { data: nodeB })

        // Assert
        expect(result).toBeGreaterThan(0)
    })

    it('should return a negative number if the value of nodeA is larger', () => {
        // Arrange
        const nodeA: TreeNode<SunburstItem> = {
            id: 1,
            name: 'NodeA',
            data: { size: 100, color: 0, id: 0, name: '' },
            children: [],
        }

        const nodeB: TreeNode<SunburstItem> = {
            id: 2,
            name: 'NodeB',
            data: { size: 50, color: 0, id: 0, name: '' },
            children: [],
        }

        // Act
        const result = sortByValue({ data: nodeA }, { data: nodeB })

        // Assert
        expect(result).toBeLessThan(0)
    })
})