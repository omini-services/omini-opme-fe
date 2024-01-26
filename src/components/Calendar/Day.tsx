import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export default function Day({ day }) {
  const events: unknown = [];
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const filteredEvents = events.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'),
    );
    if (filteredEvents.length) setDayEvents(filteredEvents);
  }, [events]);

  const getCurrentDayClass = () =>
    day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? {
          backgroundColor: (theme) => theme.palette.primary.main,
          padding: '6px',
          borderRadius: '50%',
          color: (theme) => theme.palette.primary.contrastText,
          lineHeight: 1,
        }
      : {};

  console.log(day.format('DD-MM-YY'));

  return (
    <Stack
      className="day-grid"
      direction="column"
      sx={{
        minHeight: '120px',
        minWidth: '13.9%',
        maxWidth: '13.9%',
        border: '1px solid',
        borderColor: 'rgba(229, 231, 235, 1)',
        background: () => (day.month() !== dayjs().month() ? 'gray' : 'white'),
      }}
    >
      <Stack
        className="day-grid-title"
        direction="column"
        alignItems="center"
        flexGrow={1}
        justifyContent="space-around"
      >
        <Typography variant="body1">
          {day.format('ddd').toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...getCurrentDayClass(),
          }}
        >
          {day.format('DD')}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        {/* {dayEvents.length ? <EventsTableDialog events={events} /> : null} */}

        {(day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ||
          day.unix() >= dayjs().unix()) && (
          <AddIcon
            sx={{
              cursor: 'pointer',
            }}
            onClick={() =>
              //   setEventModal({ open: true, type: 'new', eventId: null, day })
              console.log('today!')
            }
          />
        )}
      </Stack>
    </Stack>
  );
}
