import {
  UpdateType,
  RenderPosition,
} from '../consts';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import SiteFilters from '../view/site-filters';

export default class Filters {
  constructor(filtersContainer, eventsModel, filterModel) {
    this._filtersContainer = filtersContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._currentFilter = null;
    this._filterComponent = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._filterModel.addObserver(this._modelEventHandler);
    this._eventsModel.addObserver(this._modelEventHandler);
  }

  init() {
    const prevFilterComponent = this._filterComponent;

    this._currentFilter = this._filterModel.getFilter();

    this._filterComponent = new SiteFilters(this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this._filtersContainer, this._filterComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _modelEventHandler() {
    this.init();
  }

  _filterTypeChangeHandler(filterType) {
    if (this._currentFilter !== filterType) {
      this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  }
}
