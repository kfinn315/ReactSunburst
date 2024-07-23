//@ts-nocheck

import { SunburstItem } from "../../../Types"
import { createTree } from "../../TreeCreator"
import { getRootHierarchyNode } from "../getRootHierarchyNode"

describe('getRootHierarchyNode', () => {
    it('should create a root hierarchy node from the items', () => {
        // Arrange
        const items: SunburstItem[] = [
            { name: 'item1' },
            { name: 'item2' },
            { name: 'item3' },
        ]

        // Act
        const rootHierarchyNode = getRootHierarchyNode(items)

        // Assert
        expect(rootHierarchyNode).toBeDefined()
        expect(rootHierarchyNode.data).toBeDefined()
    })

    it('should call createTree with the correct arguments', () => {
        // Arrange
        const items: SunburstItem[] = [
            { name: 'item1' },
            { name: 'item2' },
            { name: 'item3' },
        ]
        const createTreeSpy = jest.spyOn(createTree, 'createTree')

        // Act
        getRootHierarchyNode(items)

        // Assert
        expect(createTreeSpy).toHaveBeenCalledWith(items, expect.any(Function))
    })

    //   it('should call getHierarchyNode with the root node from createTree', () => {
    //     // Arrange
    //     const items: Sunburst

})