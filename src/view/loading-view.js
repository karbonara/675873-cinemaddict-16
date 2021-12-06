import AbstractView from "./abstract-view";
const createLoadingTemplate = () => (
  '<h2 class="films-list__title">Loading...</h2>'
);
export default class LoadingView extends AbstractView {
  #cards = null;
  get template() {
    return createLoadingTemplate(this.#cards);
  }
}
