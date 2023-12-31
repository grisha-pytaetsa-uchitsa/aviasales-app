/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
// import { nanoid } from '@reduxjs/toolkit';

import { fetchGetTickets } from '../../store/filterSlice';
import Card from '../Card/Card';

import styles from './Card-list.module.scss';

export default function CardList() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(5);

  const { stop, tickets, sortingBtn, filter } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchGetTickets());
  }, [dispatch, stop]);

  const isActiveAnyFilter = filter.filter((el) => el.active);
  const activeFilters = isActiveAnyFilter.map((el) => el.count);

  let sortTickets;

  let filterTickets = [];

  const sortByPrice = (arr) => arr.sort((a, b) => (a.price > b.price ? 1 : -1));

  const sortByDuration = (arr) => arr.sort((a, b) => (a.segments[0].duration > b.segments[0].duration ? 1 : -1));

  if (sortingBtn[0].active) {
    sortTickets = sortByPrice([...tickets]);
  } else if (sortingBtn[1].active) {
    sortTickets = sortByDuration([...tickets]);
  } else {
    sortTickets = [...tickets];
  }

  if (filter[0].active) {
    filterTickets = sortTickets;
  } else {
    filterTickets = sortTickets.filter((ticket) => activeFilters.includes(ticket.segments[0].stops.length));
  }

  const newShortState = filterTickets.slice(0, counter);

  return (
    <ul className={styles.card_list}>
      {isActiveAnyFilter.length > 0 ? (
        newShortState.map((el, idx) => <Card key={idx} {...el} />)
      ) : (
        <li className={styles.no_filter}>
          <p>Рейсов, подходящих под заданные фильтры, не найдено</p>
        </li>
      )}

      {isActiveAnyFilter.length > 0 && (
        <button className={styles.more} type="button" onClick={() => setCounter(counter + 5)}>
          Показать еще 5 билетов!
        </button>
      )}
    </ul>
  );
}
