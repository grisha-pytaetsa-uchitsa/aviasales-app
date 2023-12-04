/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch } from 'react-redux';

import { toggleCheckbox } from '../../store/filterSlice';
import styles from '../Filter/Filter.module.scss';

export default function FilterCheckbox({ id, label, active }) {
  const dispatch = useDispatch();

  return (
    <label className={`${styles.check} ${styles.option}`}>
      <input
        className={styles.check_input}
        type="checkbox"
        value={label}
        checked={active}
        onChange={() => dispatch(toggleCheckbox({ id, label }))}
      />
      <span className={styles.check_box} />
      {label}
    </label>
  );
}
