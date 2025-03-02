import { IWhitePage } from "../../services/white-page/whitePageInterface";

export interface IWhitePageElementParams {
    whitePage: IWhitePage;
    checked: boolean;
    onClick: () => any;
}