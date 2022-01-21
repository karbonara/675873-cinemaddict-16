import AbstractObservable from '../utils/abstract-observable.js';

export default class FilmModel extends AbstractObservable {
  #cards = [];

  set cards(cards) {
    this.#cards = [...cards];
  }

  get cards() {
    return this.#cards;
  }

  updateCard = (updateType, update) => {
    const index = this.#cards.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      update,
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment = (updateType, update) => {
    this.#cards = [
      update,
      ...this.#cards,
    ];

    this._notify(updateType, update);
  }

  deleteComment = (updateType, update) => {
    const index = this.#cards.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting film');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
