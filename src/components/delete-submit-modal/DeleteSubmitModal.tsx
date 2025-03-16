import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IDeleteSubmitModalParams } from "./deleteSubmitModalParams";
import DeleteSubmitState from "../../modules/delete-submit/deleteSubmitState";

const DeleteSubmitModal = ({ button, callback }: IDeleteSubmitModalParams) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const remove = async () => await callback();
    const buttonClickHandler = async () => {
        if (DeleteSubmitState.getState()) {
            return handleShow();
        }

        await remove();
    }

    return (
        <>
            {button({ onClick: buttonClickHandler })}
            <Modal show={show} onHide={handleHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить этот элемент?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={remove}>
                        Да
                    </Button>
                    <Button variant="secondary" onClick={handleHide}>
                        Нет
                    </Button>
                </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeleteSubmitModal;