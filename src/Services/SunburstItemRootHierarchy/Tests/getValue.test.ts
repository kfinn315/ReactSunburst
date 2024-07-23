//@ts-nocheck

import { SunburstItem } from "../../../Types"
import { TreeNode } from "../../TreeCreator"
import { getValue } from '../getValue'

describe('getValue', () => {
  it('should return the size of the data property if it exists', () => {
    // Arrange
    const node: TreeNode<SunburstItem> = {
      id: 1,
      name: 'Node',
      data: { size: 100 },
      children: [],
    }

    // Act
    const result = getValue(node)

    // Assert
    expect(result).toBe(100)
  })

  it('should return 0 if the data property does not exist', () => {
    // Arrange
    const node: TreeNode<SunburstItem> = {
      id: 1,
      name: 'Node',
      children: [],
    }

    // Act
    const result = getValue(node)

    // Assert
    expect(result).toBe(0)
  })
})
