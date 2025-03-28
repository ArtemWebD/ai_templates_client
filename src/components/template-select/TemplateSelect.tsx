import { observer } from "mobx-react-lite"
import { Form } from "react-bootstrap";
import { ITemplateSelectParams } from "./templateSelectParams";
import { useContext } from "react";
import { StoreContext } from "../../store/store";

const TemplateSelect = ({ name }: ITemplateSelectParams) => {
    const { templateStore } = useContext(StoreContext);

    return (
        <Form.Select name={name || ""}>
            {
                templateStore.templates.map((template) =>
                    <option value={template.id} key={"templateselect" + template.id}>{template.title}</option>
                )
            }
        </Form.Select>
    );
}

export default observer(TemplateSelect);