const HALF_HOUR_IN_MS = 1800000;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const HOURS_IN_DAY = 24;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic um8WmpRDxYd3aPX70L`;
const SHAKE_DURATION_IN_MS = 300;
const BAR_HEIGHT = 55;

const TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const EVENT_BLANK = {
  type: `taxi`,
  destination: ``,
  description: ``,
  photos: [],
  offers: [],
  price: 0,
  startTime: new Date(),
  endTime: new Date(Date.now() + HALF_HOUR_IN_MS),
  isFavorite: false,
  onSaving: false,
  onDeleting: false,
  isDisabled: false,
};

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_BEGIN: `beforebegin`,
  BEFORE_END: `beforeend`,
};

const SortType = {
  DAY: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const Mode = {
  DEFAULT: `DEFAULT`,
  EDIT: `EDIT`,
  NEW: `NEW`,
};

const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`,
};

const UpdateType = {
  INIT: `INIT`,
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
};

const StatsTypes = {
  MONEY: `MONEY`,
  TYPE: `TYPE`,
  TIME_SPEND: `TIME-SPEND`,
};

const MenuItemsName = {
  TABLE: `table`,
  STATS: `stats`,
};

const ApiMethods = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const States = {
  SAVE: `SAVE`,
  DELETE: `DELETE`,
  ABORT: `ABORT`,
};

export {
  MINUTES_IN_HOUR,
  MINUTES_IN_DAY,
  HOURS_IN_DAY,
  TYPES,
  EVENT_BLANK,
  BAR_HEIGHT,
  END_POINT,
  AUTHORIZATION,
  SHAKE_DURATION_IN_MS,
  STORE_NAME,
  RenderPosition,
  SortType,
  FilterType,
  Mode,
  UserAction,
  UpdateType,
  StatsTypes,
  MenuItemsName,
  ApiMethods,
  SuccessHTTPStatusRange,
  States,
};
