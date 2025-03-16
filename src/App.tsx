import { useContext, useEffect } from 'react';
import PageRouter from './router/PageRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from './components/alert/alertMessage';
import changeTheme from './modules/color-theme/changeTheme';
import { StoreContext } from '.';
import Loader from './components/loader/Loader';
import DeleteSubmitState from './modules/delete-submit/deleteSubmitState';

function App() {
  const { generateTokenStore } = useContext(StoreContext);

  useEffect(() => {
    changeTheme();
    DeleteSubmitState.setState();
  }, []);

  useEffect(() => {
    const setToken = async () => {
      await generateTokenStore.getAll();

      if (localStorage.getItem("generateToken")) {
        return;
      }

      generateTokenStore.tokens.forEach((token) => {
          if (token.count > 0) {
              localStorage.setItem("generateToken", token.token);
          }
      });
    }

    setToken();
  }, []);

  return (
    <>
      <PageRouter />
      <AlertMessage />
      <Loader />
    </>
  );
}

export default App;
