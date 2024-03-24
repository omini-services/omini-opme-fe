import Box from '@mui/joy/Box';
import dayjs from 'dayjs';
import { Fragment, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { monthIndexState } from '@/atoms/calendar';

import Day from './Day';

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  let currentMonthCount = -2;
  const daysMatrix = new Array(5).fill([]).map(() =>
    new Array(7).fill(null).map(() => {
      currentMonthCount += 1;
      return dayjs(new Date(year, month, currentMonthCount));
    }),
  );
  return daysMatrix;
};

export default function Month() {
  const monthIndex = useRecoilValue(monthIndexState);
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Box
      className="month-grid"
      sx={{
        width: '1024px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {currenMonth.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
