import { useState } from "react";
import { Col, Offcanvas, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { ArrowUpRightSquare } from "react-bootstrap-icons";
import { IPageOffcanvasProps } from "./pageOffcanvasProps";
import { SERVER_URL } from "../../constants";
import "./css/style.css";

const PageOffcanvas = ({ pages, path, id }: IPageOffcanvasProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const createUrl = (page: string) => {
        return new URL(path + page + `?id=${id}&page=${page}`, SERVER_URL).toString();
    }

    return (
        <>
            <div className="templates__link" onClick={handleOpen} style={{ cursor: "pointer" }}>
                <ArrowUpRightSquare width={32} height={32} />
            </div>
            <Offcanvas className="page-offcanvas" show={show} onHide={handleClose} placement="bottom">
                <Row>
                    {
                        pages.sort((a, b) => a.length - b.length).map((page) => 
                            <Col className="page-offcanvas__col" key={"page" + page}>
                                <OverlayTrigger overlay={<Tooltip>Ссылка на страницу</Tooltip>}>
                                    <a target="_blank" href={createUrl(page)}>
                                        {page}
                                    </a>
                                </OverlayTrigger>
                            </Col>
                        )
                    }
                </Row>
            </Offcanvas>
        </>
    );
}

export default PageOffcanvas;