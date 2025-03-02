import React, { useContext, useEffect } from 'react';
import PageRouter from './router/PageRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from './components/alert/alertMessage';
import changeTheme from './modules/color-theme/changeTheme';
import { StoreContext } from '.';

function App() {
  const { generateTokenStore } = useContext(StoreContext);

  useEffect(() => {
    changeTheme();
    generateTokenStore.getAll();
  }, []);

  return (
    <>
      <PageRouter />
      <AlertMessage />
    </>
  );
}

export default App;
