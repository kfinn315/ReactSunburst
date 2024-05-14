
// import UndefinedArgumentError from '../Other/UndefinedArgumentError';
// import { Highlighter } from './Highlighter';

// describe('Highlighter', () => {
//     let highlighter;

//     beforeEach(() => {
//         highlighter = new Highlighter();
//     });

//     describe('addHighlight', () => {
//         it('adds highlight class to element', () => {
//             const element = document.createElement('div');
//             highlighter.addHighlight(element);
//             expect(element.classList.contains('highlight')).toBeTruthy();
//         });

//         it('throws UndefinedArgumentError if element is null', () => {
//             expect(() => highlighter.addHighlight(null)).toThrowError(UndefinedArgumentError);
//         });
//     });

//     describe('removeHighlight', () => {
//         it('removes highlight class from element', () => {
//             const element = document.createElement('div');
//             element.classList.add('highlight');
//             highlighter.removeHighlight(element);
//             expect(element.classList.contains('highlight')).toBeFalsy();
//         });

//         it('throws UndefinedArgumentError if element is null', () => {
//             expect(() => highlighter.removeHighlight(null)).toThrowError(UndefinedArgumentError);
//         });
//     });
// });