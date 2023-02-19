import React from 'react';
import moment from 'moment';

const getRsvedTableData = (table, reservations, times, days) => {
  return times.map((time) => {
    return (
      <tr key={time}>
        <td>
          {time} - {time + 1}
        </td>
        {days.map((day) => (
          <td
            key={`${day}-${time}`}
            style={{
              background: isBooked(table, day, time, reservations)
                ? 'red'
                : 'white',
            }}
          ></td>
        ))}
      </tr>
    );
  });
};

const isBooked = (table, day, time, reservations) => {
  const reservation = reservations.find(
    (rsv) => rsv.table_name === table && rsv.date === `${moment().format(`YYYY`)}-${day}`
  );
  return reservation && reservation.times.includes(time);
};

export default getRsvedTableData;