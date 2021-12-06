import AbstractView from "./abstract-view";

const createSiteMenuTemplate = () => (
  `<section class="header__profile profile">
      <p class="profile__rating">Movie buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
);

export default class HeaderProfileView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }
}
