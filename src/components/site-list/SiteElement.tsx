import { Col } from "react-bootstrap";
import { SERVER_URL } from "../../constants";
import { ArrowUpRightSquare, Trash } from "react-bootstrap-icons";
import { useContext } from "react";
import { ISite } from "../../services/site/siteInterface";
import PageOffcanvas from "../page-offcanvas/PageOffcanvas";
import { IDeleteButtonParams } from "../delete-submit-modal/deleteSubmitModalParams";
import DeleteSubmitModal from "../delete-submit-modal/DeleteSubmitModal";
import { StoreContext } from "../../store/store";

const DeleteElement = ({ onClick }: IDeleteButtonParams) => {
    return (
        <div className="templates__delete" onClick={onClick}>
            <Trash width={32} height={32} />
        </div>
    );
}

const SiteElement = ({ site }: { site: ISite }) => {
    const { siteStore } = useContext(StoreContext);

    const { id, title, path, pages } = site;
    const url = new URL(path, SERVER_URL);
    const uri = url + `?id=${id}&page=${pages[0]}`;

    const removeHandler = async () => {
        await siteStore.remove(id);
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
                    : <PageOffcanvas id={id} pages={pages} path={path} />
            }
            <DeleteSubmitModal button={DeleteElement} callback={removeHandler} />
        </Col>
    );
}

export default SiteElement;