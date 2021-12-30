// import AbstractView from './abstract-view.js';

// export default class SmartView extends AbstractView {

//   updateData = (update) => {
//     if (!update) {
//       return;
//     }

//     this._data = { ...this._data, ...update };

//     this.updateElement();
//   }

//   updateElement = () => {
//     const prevElement = this.element;
//     const parent = prevElement.parentElement;
//     this.removeElement();

//     const newElement = this.element;

//     parent.replaceChild(newElement, prevElement);
//   }

//   restoreHandlers = () => {
//     throw new Error('Abstract method not implemented: restoreHandlers');
//   }
// }
