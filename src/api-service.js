const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get films() {
    return this.#load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  get comments() {
    return this.#load({ url: 'comments' })
      .then(ApiService.parseResponse);
  }


  updateCard = async (movie) => {
    const response = await this.#load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  updateComment = async (comments) => {
    const response = await this.#load({
      url: `comments/${comments.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(comments)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      { method, body, headers },
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (film) => {
    const filmInfo = {
      'title': film.title,
      'age_rating': film.ageRating,
      'alternative_title': film.titleOriginal,
      'description': film.description,
      'poster': film.img,
      'genre': film.genre,
      'runtime': film.runtime,
      'total_rating': film.rating,
      'director': film.director,
      'actors': film.actors,
      'writers': film.writers,
      'release': {
        'date': film.released,
        'release_country': film.country,
      },
    };
    const userDetails = {
      'watchlist': film.isWatchlist,
      'already_watched': film.isWatched,
      'favorite': film.isFavorite,
      // 'watching_date': film.watchingDate,
    };
    const adaptedFilm = {
      'id': film.id,
      'comments': film.comment,
      'film_info': filmInfo,
      'user_details': userDetails,
    };

    return adaptedFilm;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
