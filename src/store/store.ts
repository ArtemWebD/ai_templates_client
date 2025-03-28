import { createContext } from "react";
import APIStore from "../modules/api-store/apiStore";
import AlertStore from "./alert/alertStore";
import AuthStore from "./auth/authStore";
import GenerateTokenStore from "./generate-token/generateTokenStore";
import GeneratedWhitePageStore from "./generated-white-page/generatedWhitePageStore";
import LoaderStore from "./loader/loaderStore";
import SiteStore from "./site/siteStore";
import TemplateStore from "./template/templateStore";
import WhitePageStore from "./white-page/whitePageStore";

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

export const store = {
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