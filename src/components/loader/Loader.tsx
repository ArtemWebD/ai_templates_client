import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../..";
import { Spinner } from "react-bootstrap";
import "./css/style.css";

const Loader = () => {
    const { loaderStore } = useContext(StoreContext);

    return (
        <>
            {
                loaderStore.isLoading && 
                <div className="loader">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </>
    );
}

export default observer(Loader);