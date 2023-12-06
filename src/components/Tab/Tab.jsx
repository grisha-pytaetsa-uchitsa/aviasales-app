/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch } from 'react-redux';

import { toggleTab } from '../../store/filterSlice';
import styles from '../Tab-list/Tabs.module.scss';

export default function Tab({ label, id, active }) {
  const dispatch = useDispatch();
  let cls;
  if (label === 'самый дешевый') {
    cls = styles.inexp;
  }
  if (label === 'самый быстрый') {
    cls = styles.fast;
  }
  if (label === 'оптимальный') {
    cls = styles.optimal;
  }
  let activeCls;
  if (active) {
    activeCls = `${cls} ${styles.active}`;
  }
  return (
    <label className={active ? activeCls : cls}>
      <input type="radio" name="drone" onChange={() => dispatch(toggleTab({ id }))} />
      {label}
    </label>
  );
}
