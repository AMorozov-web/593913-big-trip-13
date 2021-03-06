import {
  RenderPosition,
  Mode,
  UpdateType,
  UserAction,
  States,
} from '../consts';
import {
  isOnline,
} from '../utils/common';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import {
  toast,
} from '../utils/toast';
import EventForm from '../view/event-form';
import Event from '../view/event';

export default class Point {
  constructor(pointsContainer, changeData, changeMode) {
    this._pointsContainer = pointsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointRollupClick = this._handlePointRollupClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormResetClick = this._handleFormResetClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint, destinations, offers) {
    this._point = tripPoint;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new Event(tripPoint);
    this._pointEditComponent = new EventForm(tripPoint, destinations, offers);

    this._pointComponent.setPointRollupButtonClickHandler(this._handlePointRollupClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormRollupButtonClickHandler(this._handleFormRollupClick);
    this._pointEditComponent.setResetButtonClickHandler(this._handleFormResetClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointsContainer, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDIT) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceCardToPoint();
    }
  }

  setState(state) {
    const resetState = () => {
      this._pointEditComponent.updateData({
        onSaving: false,
        onDeleting: false,
        isDisabled: false,
      });
    };

    switch (state) {
      case States.SAVE:
        this._pointEditComponent.updateData({
          onSaving: true,
          isDisabled: true,
        });
        break;
      case States.DELETE:
        this._pointEditComponent.updateData({
          onDeleting: true,
          isDisabled: true,
        });
        break;
      case States.ABORT:
        this._pointComponent.shake(resetState);
        this._pointEditComponent.shake(resetState);
        break;
    }
  }

  _replaceCardToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToCard() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceCardToPoint();
    }
  }

  _handlePointRollupClick() {
    if (!isOnline()) {
      toast(`You cannot edit an event offline`);
      return;
    }

    this._replacePointToCard();
  }

  _handleFormRollupClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceCardToPoint();
  }

  _handleFormResetClick(point) {
    if (this._mode === Mode.EDIT) {

      if (!isOnline()) {
        toast(`You cannot delete an event offline`);
        return;
      }

      this._changeData(
          UserAction.DELETE_POINT,
          UpdateType.MINOR,
          point
      );
      return;
    }
    this._pointEditComponent.reset(this._point);
    this._replaceCardToPoint();
  }

  _handleFormSubmit(point) {
    if (!isOnline()) {
      toast(`You cannot save an event offline`);
      return;
    }

    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
    this._replaceCardToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }
}
