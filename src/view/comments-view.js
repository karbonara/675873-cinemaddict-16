import { datePopupComments } from '../utils/task.js';
import SmartView from './smart-view.js';
import { EMOJI_IMGES } from '../const.js';

// const BLANK_COMMENT = {
//   emoji: EMOJI_IMGES[0],
// };

const createCommentEditEmojiTemplate = (emoji, card) => (
  `<input
  class="film-details__emoji-item visually-hidden"
  name="comment-emoji"
  type="radio"
  id="emoji-${emoji}"
  value="${emoji}" ${card.commentImg === emoji ? 'checked' : ''}>
  <label
  class="film-details__emoji-label"
  for="emoji-${emoji}">
    <img
    data-emoji="${emoji}"
    src="./images/emoji/${emoji}.png"
    width="30"
    height="30"
    alt="emoji">
  </label>`
);

const createPopupCommentsTemplate = (card) => {
  const {
    comment,
    commentName,
    commentCount,
    commentImgEmoji,
  } = card;
  const commentsList = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentImgEmoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentName}</span>
          <span class="film-details__comment-day">${datePopupComments()}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;

  const emojiTemplate = EMOJI_IMGES.map((emoji) => createCommentEditEmojiTemplate(emoji, card)).join('');

  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
    <ul class="film-details__comments-list">
        ${commentsList}
    </ul>

    <div class="film-details__new-comment">

      <div class="film-details__add-emoji-label">
        ${card.commentImg ? `<img src="./images/emoji/${card.commentImg}.png" width="55" height="55" alt="emoji-${card.commentImg}">` : ''}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${card.commentText ? card.commentText : ''}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiTemplate}
      </div>

    </div>
  </section>`;
};

export default class CommentsView extends SmartView {

  constructor(comments) {
    super();
    this._data = CommentsView.parseCommentToData(comments);

    this.#setInnerHandlers();
  }

  get template() {
    return createPopupCommentsTemplate(this._data);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
  }

  reset = (card) => {
    this.updateData(
      CommentsView.parseCommentToData(card),
    );
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#descriptionInputHandler);

    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#commentImgChangeHandler);
  }

  #commentImgChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      commentImg: evt.target.value,
    });
  }

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value
    }, true);
  }

  static parseCommentToData = (comments) => ({
    ...comments,
    commentImg: null,
    commentText: null,
  });

  static = (data) => {
    const comments = { ...data };

    if (!comments) {
      comments.commentImg = null;
      comments.commentText = null;
    }

    delete comments.commentImg;
    delete comments.commentText;

    return comments;
  }
}
