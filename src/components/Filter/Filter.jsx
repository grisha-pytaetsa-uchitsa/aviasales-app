/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSelector } from 'react-redux/es/hooks/useSelector';

import FilterCheckbox from '../Filter-checkbox/Filter-checkbox';

import styles from './Filter.module.scss';

export default function Filter() {
  const filterState = useSelector((state) => state.filter.filter);

  return (
    <div className={styles.filter}>
      <h3 className={styles.green}>количество пересадок</h3>
      <form className="form">
        {filterState.map((el) => (
          <FilterCheckbox label={el.label} key={el.id} id={el.id} active={el.active} />
        ))}
      </form>
    </div>
  );
}
