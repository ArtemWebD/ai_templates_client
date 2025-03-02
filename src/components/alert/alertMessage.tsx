import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { StoreContext } from "../..";
import "./css/style.css";

const AlertMessage = () => {
    const { alertStore } = useContext(StoreContext);

    return (
        alertStore.isShow ? 
            <Alert variant={alertStore.type}>
                {alertStore.message}
            </Alert>
            : <></>
        
    );
}

export default observer(AlertMessage);