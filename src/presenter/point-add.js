import {
  UserAction,
  UpdateType,
  EVENT_BLANK,
  RenderPosition,
} from '../consts';
import {
  render,
  remove,
} from '../utils/render';
import EventForm from '../view/event-form';

export default class PointAdd {
  constructor(formContainer, changeData) {
    this._formContainer = formContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;
    this._destroyCallback = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback, destinations, offers) {
    this._destroyCallback = callback;

    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventForm(EVENT_BLANK, destinations, offers, true);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setResetButtonClickHandler(this._resetButtonClickHandler);

    render(this._formContainer, this._eventEditComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSavingState() {
    this._eventEditComponent.updateData({
      onSaving: true,
      isDisabled: true,
    });
  }

  setAbortingState() {
    const resetState = () => {
      this._eventEditComponent.updateData({
        onSaving: false,
        onDeleting: false,
        isDisabled: false,
      });
    };

    this._eventEditComponent.shake(resetState);
  }

  _formSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        event
    );
  }

  _resetButtonClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
