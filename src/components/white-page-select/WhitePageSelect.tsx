import { observer } from "mobx-react-lite";
import "./css/style.css";
import { useContext, useState } from "react";
import { StoreContext } from "../..";
import { Row } from "react-bootstrap";
import WhitePageElement from "./WhitePageElement";

const WhitePageSelect = ({ onSelect }: { onSelect: (id: number) => any }) => {
    const { whitePageStore } = useContext(StoreContext);
    const [id, setId] = useState(NaN);

    const setIdHandler = (id: number) => {
        setId(id);
        onSelect(id);
    }

    return (
        <Row className="templates templates_select">
            {
                whitePageStore.whitePages.map((whitePage) => 
                    <WhitePageElement 
                        whitePage={whitePage} 
                        onClick={() => setIdHandler(whitePage.id)} 
                        checked={id === whitePage.id} 
                        key={"whitepageselect" + whitePage.id} 
                    />
                )
            }
        </Row>
    );
}

export default observer(WhitePageSelect);