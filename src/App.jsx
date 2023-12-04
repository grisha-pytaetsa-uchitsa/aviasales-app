/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Spin, Alert, Space } from 'antd';

import CardList from './components/Card-list/Card-list';
import Filter from './components/Filter/Filter';
import TabList from './components/Tab-list/Tab-list';

export default function App() {
  const { status, error } = useSelector((state) => state.filter);
  return (
    <div className="body_container">
      {status === 'loading' ? (
        <div className="spinner">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </div>
      ) : (
        <img className="logo" src="./img/Logo.png" alt="logo" />
      )}
      {error && (
        <Space className="errorText" direction="vertical">
          <Alert message="Error" description={error} type="error" closable />
        </Space>
      )}
      <main className="main_container">
        <Filter />
        <section className="main_section">
          <TabList />
          <CardList />
        </section>
      </main>
    </div>
  );
}
