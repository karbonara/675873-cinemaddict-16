import AbstractView from './abstract-view.js';

const createFooterTemplate = (counter) => (
  `<p>${counter} movies inside</p>`
);

export default class FooterView extends AbstractView {
  #counter = null;

  constructor(counter) {
    super();
    this.#counter = counter;
  }

  get template() {
    return createFooterTemplate(this.#counter);
  }
}
