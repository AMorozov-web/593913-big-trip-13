import {TOTAL_EVENTS_COUNT} from './mock/consts';
import {
  RenderPosition,
  SortType,
} from './consts';
import {
  renderElement,
  getSortedEvents,
} from './utils/utils';
import {generateEvent} from './mock/event-create';
import SiteInfo from './view/site-info';
import SiteControls from './view/site-controls';
import NewEventButton from './view/new-event-button';
import EventSort from './view/event-sort';
import EventsList from './view/events-list';
import EventForm from './view/event-form';
import Event from './view/event';
import EventsEmpty from './view/events-empty';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsSorted = getSortedEvents(events, SortType.DAY);

const renderEvent = (eventsContainer, event) => {
  const eventComponent = new Event(event);
  const eventEditComponent = new EventForm(event);

  const replaceItemToForm = () => {
    eventsContainer.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToItem = () => {
    eventsContainer.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setButtonClickHandler(() => {
    replaceItemToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setButtonClickHandler(() => {
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(eventsContainer, eventComponent.getElement(), RenderPosition.BEFORE_END);
};

const renderEventsList = (eventsListContainer, tripPoints) => {
  const eventsList = new EventsList();

  renderElement(eventsListContainer, eventsList.getElement(), RenderPosition.BEFORE_END);

  if (!tripPoints.length) {
    renderElement(eventsList.getElement(), new EventsEmpty().getElement(), RenderPosition.AFTER_BEGIN);
    return;
  }

  renderElement(eventsList.getElement(), new EventSort().getElement(), RenderPosition.BEFORE_END);

  tripPoints.forEach((item) => renderEvent(eventsList.getElement(), item));
};

renderElement(tripMainElement, new SiteInfo(eventsSorted).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripMainElement, new SiteControls().getElement(), RenderPosition.BEFORE_END);
renderElement(tripMainElement, new NewEventButton().getElement(), RenderPosition.BEFORE_END);

renderEventsList(tripEventsBoard, eventsSorted);
