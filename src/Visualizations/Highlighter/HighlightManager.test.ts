// import { jest, expect, test } from '@jest/globals';
// import { IHighlighter } from './Highlighter';
// import HighlightManager from './HighlightManager';

// const mockHighlighter: IHighlighter = { addHighlight: jest.fn((element: Element) => { }), removeHighlight: jest.fn((element: Element) => { }) }

// afterEach(() => {
//     jest.clearAllMocks()
// })
// describe('HighlightManager', () => {
//     describe("highlight", () => {
//         it('Throws an ArgumentException if elements is undefined ', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             expect(() => {
//                 objectInTest.addHighlight(undefined as unknown as Element[])
//             }).toThrowError('Argument elements is undefined')
//         });
//         it('Doesnt throw if elements is empty list', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             const elements = []
//             expect(() => {
//                 objectInTest.addHighlight(elements)
//             }).not.toThrowError()
//         })
//         it('Doesnt throw if elements is full list', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             const elements: Element[] = [document.createElement('div'), document.createElement('a'), document.createElement('button')]
//             expect(() => {
//                 objectInTest.addHighlight(elements)
//             }).not.toThrowError()
//         })
//         it('calls the highlighter.addHighlight method on each element of the argument list', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             const elements: Element[] = [document.createElement('div'), document.createElement('a'), document.createElement('button')]
//             objectInTest.addHighlight(elements)
//             elements.forEach(element => { expect(mockHighlighter.addHighlight).toHaveBeenCalledWith(element); })
//         });
//     });
//     describe("removeHighlights", () => {
//         it('Throws an ArgumentException if elements is undefined ', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             expect(() => {
//                 objectInTest.removeHighlights(undefined as unknown as Element[])
//             }).toThrowError('Argument elements is undefined')
//         });
//         it('Doesnt throw if elements is empty list', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             const elements = []
//             expect(() => {
//                 objectInTest.removeHighlights(elements)
//             }).not.toThrowError()
//         })
//         it('Doesnt throw if elements is full list', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             const elements: Element[] = [document.createElement('div'), document.createElement('a'), document.createElement('button')]
//             expect(() => {
//                 objectInTest.removeHighlights(elements)
//             }).not.toThrowError()
//         })
//         it('calls the highlighter.removeHighlight method on each element of the argument list', () => {
//             const objectInTest = new HighlightManager(mockHighlighter)
//             const elements: Element[] = [document.createElement('div'), document.createElement('a'), document.createElement('button')]
//             objectInTest.removeHighlights(elements)
//             elements.forEach(element => { expect(mockHighlighter.removeHighlight).toHaveBeenCalledWith(element); })
//         });
//     });
// });
