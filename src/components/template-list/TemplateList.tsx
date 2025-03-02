import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";
import { StoreContext } from "../..";
import TemplateElement from "./TemplateElement";
import "./css/style.css";

const TemplateList = () => {
    const { templateStore } = useContext(StoreContext);

    return (
        <Row className="mt-5 templates">
            {
                templateStore.templates.map((template) => {
                    return <TemplateElement template={template} key={`template${template.id}`} />
                })
            }
        </Row>
    );
}

export default observer(TemplateList);
