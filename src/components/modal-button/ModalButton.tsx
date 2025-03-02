import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IModalButtonParams } from "./modalButtonParams";

const ModalButton = ({ text, modalBody, modalTitle }: IModalButtonParams) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {text}
            </Button>
            <Modal show={show} onHide={handleHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
            </Modal>
        </>
    );
}

export default ModalButton;