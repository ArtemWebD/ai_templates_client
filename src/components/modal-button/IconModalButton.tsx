import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IIconModalButtonParams } from "./modalButtonParams";

const IconModalButton = ({ icon, modalBody, modalTitle }: IIconModalButtonParams) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <div onClick={handleShow}>
                {icon}
            </div>
            <Modal show={show} onHide={handleHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
            </Modal>
        </>
    );
}

export default IconModalButton;