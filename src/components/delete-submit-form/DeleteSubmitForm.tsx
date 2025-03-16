import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DeleteSubmitState from "../../modules/delete-submit/deleteSubmitState";

const DeleteSubmitForm = () => {
    const [checked, setChecked] = useState(DeleteSubmitState.getState());

    const changeChecked = () => setChecked(!checked);

    useEffect(() => {
        DeleteSubmitState.setState(checked);
    }, [checked]);

    return (
        <Form>
            <h5>Подтверждение удаления</h5>
            <Form.Group>
                <Form.Label>
                    Спрашивать подтверждение при каждом удалении элементов
                </Form.Label>
                <Form.Check type="switch" label="Включить" checked={checked} onChange={changeChecked} />
            </Form.Group>
        </Form>
    );
}

export default DeleteSubmitForm;