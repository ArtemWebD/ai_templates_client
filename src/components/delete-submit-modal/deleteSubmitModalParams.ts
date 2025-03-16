import { JSX } from "react";

export interface IDeleteSubmitModalParams {
    callback: () => void | Promise<void>;
    button: (params: IDeleteButtonParams) => JSX.Element
}

export interface IDeleteButtonParams {
    onClick: () => any
}