import AbstractView from "./abstract-view";

const createFilmCardRatedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>`
);
export default class FilmRatedView extends AbstractView {
  #cards = null;
  get template() {
    return createFilmCardRatedTemplate(this.#cards);
  }
}
