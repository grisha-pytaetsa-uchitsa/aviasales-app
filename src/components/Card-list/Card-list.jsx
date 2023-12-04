/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { nanoid } from '@reduxjs/toolkit';

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
  console.log(tickets);

  const isActiveAnyFilter = filter.filter((el) => el.active);

  let sortTickets;

  let filterTickets = [];

  const sortByPrice = (arr) => arr.sort((a, b) => (a.price > b.price ? 1 : -1));

  const sortByDuration = (arr) => arr.sort((a, b) => (a.segments[0].duration > b.segments[0].duration ? 1 : -1));

  const filterFn = (arr) => arr.sort((a, b) => (a.segments[0].stops.length > b.segments[0].stops.length ? 1 : -1));

  if (sortingBtn[0].active) {
    sortTickets = sortByPrice([...tickets]);
  } else if (sortingBtn[1].active) {
    sortTickets = sortByDuration([...tickets]);
  } else {
    sortTickets = [...tickets];
  }

  if (filter[0].active) {
    filterTickets = sortTickets;
  } else if (filter[1].active) {
    filterTickets = filterFn(sortTickets);
    filterTickets = filterTickets.filter((el) => el.segments[0].stops.length === 0).reverse();
  } else if (filter[2].active) {
    filterTickets = filterFn(sortTickets);
    filterTickets = filterTickets.filter((el) => el.segments[0].stops.length === 1).reverse();
  } else if (filter[3].active) {
    filterTickets = filterFn(sortTickets);
    filterTickets = filterTickets.filter((el) => el.segments[0].stops.length === 2).reverse();
  } else if (filter[4].active) {
    filterTickets = filterFn(sortTickets);
    filterTickets = filterTickets.filter((el) => el.segments[0].stops.length === 3).reverse();
  }

  const newShortTicketsState = filterTickets.slice(0, counter);

  return (
    <ul className={styles.card_list}>
      {isActiveAnyFilter.length > 0 ? (
        newShortTicketsState.map((el) => <Card key={nanoid()} {...el} />)
      ) : (
        <li className={styles.no_filter}>
          <p>Рейсов, подходящих под заданные фильтры, не найдено</p>
        </li>
      )}
      {isActiveAnyFilter.length > 0 || newShortTicketsState > 0 ? (
        <button className={styles.more} type="button" onClick={() => setCounter(counter + 5)}>
          Показать еще 5 билетов!
        </button>
      ) : null}
    </ul>
  );
}
