/* eslint-disable import/no-extraneous-dependencies */
import { add, format } from 'date-fns';

import styles from './Card.module.scss';

export default function Card({ price, segments, carrier }) {
  const ticketTo = segments[0];
  const ticketFrom = segments[1];

  const stopsFn = (ticket) => {
    const stops = ticket.stops.map((el) => {
      let newText;
      if (el) {
        newText = ` ${el}`;
      }
      return newText;
    });
    return stops.join();
  };

  const dateFn = (date, duration) => {
    const newFormat = format(new Date(date), 'hh:mm');
    const newDate = add(new Date(date), { minutes: duration });
    const newDateFormat = format(new Date(newDate), 'hh:mm');
    const newDateStr = `${newFormat} - ${newDateFormat}`;
    return newDateStr;
  };

  const dateTo = dateFn(ticketTo.date, ticketTo.duration);
  const dateFrom = dateFn(ticketFrom.date, ticketFrom.duration);

  const stopsTo = stopsFn(ticketTo);
  const stopsFrom = stopsFn(ticketFrom);

  const getTimeFromMins = (mins) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    const newDurationStr = `${hours}ч ${minutes}м`;
    return newDurationStr;
  };

  const newDurationTo = getTimeFromMins(ticketTo.duration);
  const newDurationFrom = getTimeFromMins(ticketFrom.duration);

  return (
    <div className={styles.card}>
      <div className={styles.price}>
        <h1 className={styles.red}>{price} Р</h1>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="avia company" />
      </div>

      <div className={styles.ticket}>
        <div className={styles.info}>
          <h3>
            {ticketTo.origin} - {ticketTo.destination}
          </h3>
          <span>{dateTo}</span>
        </div>
        <div className={styles.info}>
          <h3>В ПУТИ</h3>
          <span>{newDurationTo}</span>
        </div>
        <div className={styles.info}>
          <h3>{ticketTo.stops.length} ПЕРЕСАДКИ</h3>
          <span>{stopsTo}</span>
        </div>
      </div>

      <div className={styles.ticket}>
        <div className={styles.info}>
          <h3>
            {ticketFrom.origin} - {ticketFrom.destination}
          </h3>
          <span>{dateFrom}</span>
        </div>
        <div className={styles.info}>
          <h3>В ПУТИ</h3>
          <span>{newDurationFrom}</span>
        </div>
        <div className={styles.info}>
          <h3>{ticketFrom.stops.length} ПЕРЕСАДКИ</h3>
          <span>{stopsFrom}</span>
        </div>
      </div>
    </div>
  );
}
