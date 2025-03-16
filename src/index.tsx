import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthStore from './store/auth/authStore';
import AlertStore from './store/alert/alertStore';
import TemplateStore from './store/template/templateStore';
import SiteStore from './store/site/siteStore';
import WhitePageStore from './store/white-page/whitePageStore';
import GeneratedWhitePageStore from './store/generated-white-page/generatedWhitePageStore';
import GenerateTokenStore from './store/generate-token/generateTokenStore';
import LoaderStore from './store/loader/loaderStore';
import APIStore from './modules/api-store/apiStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface IStore {
  authStore: AuthStore;
  alertStore: AlertStore;
  templateStore: TemplateStore;
  siteStore: SiteStore;
  whitePageStore: WhitePageStore;
  generatedWhitePageStore: GeneratedWhitePageStore;
  generateTokenStore: GenerateTokenStore;
  loaderStore: LoaderStore;
}

const alertStore = new AlertStore();
const loaderStore = new LoaderStore();

const apiStore = new APIStore(alertStore, loaderStore);

const store = {
  authStore: new AuthStore(apiStore),
  templateStore: new TemplateStore(apiStore),
  siteStore: new SiteStore(apiStore),
  whitePageStore: new WhitePageStore(apiStore),
  generatedWhitePageStore: new GeneratedWhitePageStore(apiStore),
  generateTokenStore: new GenerateTokenStore(apiStore),
  loaderStore,
  alertStore,
}

export const StoreContext = createContext<IStore>(store);

root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </BrowserRouter>
);

reportWebVitals();
