import { JSX } from "react";

export interface IModalButtonParams {
    text: string;
    modalTitle: string;
    modalBody: JSX.Element;
}

export interface IIconModalButtonParams {
    icon: JSX.Element;
    modalTitle: string;
    modalBody: JSX.Element;
}