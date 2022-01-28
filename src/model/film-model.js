import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';
export default class FilmModel extends AbstractObservable {
  #apiService = null;
  #films = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateCard = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    // this.#films = [
    //   ...this.#films.slice(0, index),
    //   update,
    //   ...this.#films.slice(index + 1),
    // ];

    // this._notify(updateType, update);

    try {
      const response = await this.#apiService.updateCard(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update film');
    }
  }


  #adaptToClient = (movie) => {
    const adaptedMovie = {
      ...movie,
      actors: movie['film_info'].actors,
      ageRating: movie['film_info']['age_rating'],
      originalTitle: movie['film_info']['alternative_title'],
      description: movie['film_info']['description'],
      director: movie['film_info']['director'],
      genre: movie['film_info']['genre'],
      img: movie['film_info']['poster'],
      writers: movie['film_info']['writers'],
      country: movie['film_info']['release']['release_country'],
      releaseDate: movie['film_info']['release']['date'],
      duration: movie['film_info']['runtime'],
      title: movie['film_info']['title'],
      rating: movie['film_info']['total_rating'],
      isFavorite: movie['user_details']['favorite'],
      isWatchlist: movie['user_details']['watchlist'],
      isWatched: movie['user_details']['already_watched'],
    };

    delete adaptedMovie['film_info'].actors;
    delete adaptedMovie['film_info']['age_rating'];
    delete adaptedMovie['film_info']['alternative_title'];
    delete adaptedMovie['film_info']['description'];
    delete adaptedMovie['film_info']['director'];
    delete adaptedMovie['film_info']['genre'];
    delete adaptedMovie['film_info']['poster'];
    delete adaptedMovie['film_info']['release']['release_country'];
    delete adaptedMovie['film_info']['release']['date'];
    delete adaptedMovie['film_info']['runtime'];
    delete adaptedMovie['film_info']['title'];
    delete adaptedMovie['film_info']['writers'];
    delete adaptedMovie['film_info'];
    delete adaptedMovie['user_details']['favorite'];
    delete adaptedMovie['user_details']['watchlist'];
    delete adaptedMovie['user_details']['already_watched'];
    delete adaptedMovie['user_details'];

    return adaptedMovie;
  }


}
