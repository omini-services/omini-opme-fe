import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/pt-br';
import React, { useState } from 'react';

import { INITIAL_EVENTS, createEventId } from './utils';

import './index.css';

const renderEventContent = (eventContent: EventContentArg) => (
  <>
    <b>{eventContent.timeText}</b>
    <i>{eventContent.event.title}</i>
  </>
);

const renderSidebarEvent = (event: EventApi) => (
  <li key={event.id}>
    <b>
      {formatDate(event.start!, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </b>
    <span>
      <b>
        {formatDate(event.start!, {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </b>
    </span>
    <span> - </span>
    <i>{event.title}</i>
  </li>
);

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const renderSidebar = () => (
    <div className="calendar-sidebar">
      <div className="calendar-sidebar-section">
        <h2>Todos os eventos ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </div>
      <div className="calendar-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={() => setWeekendsVisible(!weekendsVisible)}
          />
          Mostrar finais de semana
        </label>
      </div>
    </div>
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`,
    );
    clickInfo.event.remove();
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  return (
    <div className="calendar">
      {renderSidebar()}
      <div className="calendar-main">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          locale={esLocale}
        />
      </div>
    </div>
  );
};

export default Calendar;
