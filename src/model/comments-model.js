import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';
export default class CommentsModel extends AbstractObservable {
  // #apiService = null;
  // #comments = [];

  // constructor(apiService) {
  //   super();
  //   this.#apiService = apiService;
  // }

  // get comments() {
  //   return this.#comments;
  // }

  // init = async () => {
  //   try {
  //     const comments = await this.#apiService.comments;
  //     this.#comments = comments.map(this.#adaptToClient);
  //   } catch (err) {
  //     this.#comments = [];
  //   }

  //   this._notify(UpdateType.INIT);
  // }

  // addComment = (updateType, update) => {
  //   this.#comments = [
  //     update,
  //     ...this.#comments,
  //   ];

  //   this._notify(updateType, update);
  // }

  // updateComment = (updateType, update) => {
  //   const index = this.#comments.findIndex((comment) => comment.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t delete unexisting comment');
  //   }

  //   this.#comments = [
  //     ...this.#comments.slice(0, index),
  //     ...this.#comments.slice(index + 1),
  //   ];

  //   this._notify(updateType);
  // }

  // #adaptToClient = (comments) => {
  //   const adaptedComment = {
  //     ...comments,
  //     commentImgEmoji: comments['emotion'],
  //     commentName: comments['author'],

  //   };
  //   delete adaptedComment['emotion'];
  //   delete adaptedComment['author'];

  //   return adaptedComment;
  // }

  #apiService = null;
  #comments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }


  get comments() {
    return this.#comments;
  }

  init = async (filmCard) => {
    try {
      const comments = await this.#apiService.getComments(filmCard);
      this.#comments = comments.map(this.#adaptToClient);
    } catch (err) {
      this.#comments = [];
    }

    return this.#comments;
  }

  #adaptToClient = (comment) => {
    const adaptedComment = {
      ...comment,
      commentImgEmoji: comment['emotion'],
      commentName: comment['author'],

    };
    delete adaptedComment['emotion'];
    delete adaptedComment['author'];

    return adaptedComment;
  }

  addComment = (updateType, update, newComment) => {
    this.#comments = [
      newComment,
      ...this.#comments,
    ];
    this._notify(UpdateType, update);
  }

  deleteComment = (updateType, update, commentToDelete) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentToDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }


}
