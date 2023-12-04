/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux/es/hooks/useSelector';

import Tab from '../Tab/Tab';

import styles from './Tabs.module.scss';

export default function TabList() {
  const tabsState = useSelector((state) => state.filter.sortingBtn);
  return (
    <div className={styles.button_container}>
      {tabsState.map((el) => (
        <Tab key={el.id} label={el.label} active={el.active} id={el.id} styleName={el.class} />
      ))}
    </div>
  );
}
