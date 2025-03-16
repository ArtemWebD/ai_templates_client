import { Col } from "react-bootstrap";
import { ITemplate } from "../../services/template/templateInterface";
import { SERVER_URL } from "../../constants";
import { ArrowUpRightSquare, Trash } from "react-bootstrap-icons";
import { useContext } from "react";
import { StoreContext } from "../..";
import PageOffcanvas from "../page-offcanvas/PageOffcanvas";
import DeleteSubmitModal from "../delete-submit-modal/DeleteSubmitModal";
import { IDeleteButtonParams } from "../delete-submit-modal/deleteSubmitModalParams";

const DeleteButton = ({ onClick }: IDeleteButtonParams) => {
    return (
        <div className="templates__delete" onClick={onClick}>
            <Trash width={32} height={32} />
        </div>
    );
}

const TemplateElement = ({ template }: { template: ITemplate }) => {
    const { templateStore } = useContext(StoreContext);

    const { id, title, path, pages } = template;
    const url = new URL(path, SERVER_URL);
    const uri = url + `?id=${id}&page=${pages[0]}`;

    const removeHandler = async () => {
        await templateStore.remove(id);
    }

    return (
        <Col>
            <h3>{title}</h3>
            <iframe className="mt-2" src={uri} frameBorder="0" width="1280" height="1280" scrolling="no" sandbox="" />
            {
                pages.length === 1
                    ? <a href={uri} target="_blank" className="templates__link">
                        <ArrowUpRightSquare width={32} height={32} />
                      </a>
                    : <PageOffcanvas pages={pages} path={path} id={id} />
            }
            <DeleteSubmitModal button={DeleteButton} callback={removeHandler} />
        </Col>
    );
}

export default TemplateElement;