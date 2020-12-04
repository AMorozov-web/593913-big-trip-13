import {createElement} from '../utils/utils';

const createNewEventButtonTemplate = () => {
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
      New event
    </button>
  `;
};

export default class NewEventButtonView {
  constructor() {
    this._element = null;
  }


  getTemplate() {
    return createNewEventButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}