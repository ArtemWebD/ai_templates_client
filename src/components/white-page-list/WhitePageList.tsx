import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";
import "../template-list/css/style.css";
import WhitePageElement from "./WhitePageElement";
import { StoreContext } from "../../store/store";

const WhitePageList = () => {
    const { whitePageStore } = useContext(StoreContext);

    return (
        <Row className="mt-5 templates">
            {
                whitePageStore.whitePages.map((whitePage) => {
                    return <WhitePageElement whitePage={whitePage} key={`whitepage${whitePage.id}`} />
                })
            }
        </Row>
    );
}

export default observer(WhitePageList);
