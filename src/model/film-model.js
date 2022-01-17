import AbstractObservable from '../utils/abstract-observable.js';

export default class FilmModel extends AbstractObservable {
  #films = [];

  set films(films) {
    this.#films = [...films];
  }

  get films() {
    return this.#films;
  }
}
