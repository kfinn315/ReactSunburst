// @ts-nocheck
import { HighlighterWrapper } from "../HighlighterWrapper"

// Unit tests
describe('HighlighterWrapper', () => {
    describe('setRef', () => {
        it('should set the highlighter ref', () => {
            // Arrange
            const ref = {
                current: null
            }
            const getHighlighter = jest.fn()
            const highlighterWrapper = new HighlighterWrapper(getHighlighter)

            // Act
            highlighterWrapper.setRef(ref)

            // Assert
            expect(highlighterWrapper['highlighter']).toBe(getHighlighter(ref))
        })
    })

    describe('clear', () => {
        it('should call the clear method of highlighter if setRef has been called', () => {
            // Arrange
            const ref = {
                current: null
            }
            const highlighter = {
                clear: jest.fn()
            }
            const getHighlighter = jest.fn().mockReturnValueOnce(highlighter)
            const highlighterWrapper = new HighlighterWrapper(getHighlighter)
            highlighterWrapper.setRef(ref)

            // Act
            highlighterWrapper.clear()

            // Assert
            expect(highlighter.clear).toHaveBeenCalledTimes(1)
        })

        it('should log a message if setRef has not been called', () => {
            // Arrange
            console.info = jest.fn()
            const ref: MutableRefObject<SVGGElement | null> = {
                current: null,
            }
            const getHighlighter: GetHighlighterMethod<any> = jest.fn()
            const highlighterWrapper = new HighlighterWrapper<any>(getHighlighter)

            // Act
            highlighterWrapper.clear()

            // Assert
            expect(console.info).toHaveBeenCalledWith('Please call setRef() before clear()')
        })
    })
    describe('highlight', () => {
        it('should call the highlight method of highlighter if setRef has been called', () => {
            // Arrange
            const ref: MutableRefObject<SVGGElement | null> = {
                current: null,
            }
            const item: HierarchyNode<TreeNode<any>> = {} as any
            const highlighter: Highlighter<HierarchyNode<TreeNode<any>>> = {
                clear: jest.fn(),
                highlight: jest.fn(),
            }
            const getHighlighter: GetHighlighterMethod<any> = jest.fn().mockReturnValueOnce(highlighter)
            const highlighterWrapper = new HighlighterWrapper<any>(getHighlighter)
            highlighterWrapper.setRef(ref)

            // Act
            highlighterWrapper.highlight(item)

            // Assert
            expect(highlighter.highlight).toHaveBeenCalledWith(item)
        })

        it('should log a message if setRef has not been called', () => {
            // Arrange
            console.info = jest.fn()
            const ref: MutableRefObject<SVGGElement | null> = {
                current: null,
            }
            const item: HierarchyNode<TreeNode<any>> = {} as any
            const getHighlighter: GetHighlighterMethod<any> = jest.fn()
            const highlighterWrapper = new HighlighterWrapper<any>(getHighlighter)

            // Act
            highlighterWrapper.highlight(item)

            // Assert
            expect(console.info).toHaveBeenCalledWith('Please call setRef() before highlight()')
        })
    })
})