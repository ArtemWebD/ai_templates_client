import { Col } from "react-bootstrap";
import { SERVER_URL } from "../../constants";
import { ArrowUpRightSquare, Trash } from "react-bootstrap-icons";
import { useContext } from "react";
import { IWhitePage } from "../../services/white-page/whitePageInterface";
import { IDeleteButtonParams } from "../delete-submit-modal/deleteSubmitModalParams";
import DeleteSubmitModal from "../delete-submit-modal/DeleteSubmitModal";
import { StoreContext } from "../../store/store";

const DeleteButton = ({ onClick }: IDeleteButtonParams) => {
    return (
        <div className="templates__delete" onClick={onClick}>
            <Trash width={32} height={32} />
        </div>
    );
}

const WhitePageElement = ({ whitePage }: { whitePage: IWhitePage }) => {
    const { whitePageStore } = useContext(StoreContext);

    const { id, title, path } = whitePage;
    const url = new URL(path, SERVER_URL);
    const uri = url + `?id=${id}`;

    const removeHandler = async () => {
        await whitePageStore.remove(id);
    }

    return (
        <Col>
            <h3>{title}</h3>
            <iframe className="mt-2" src={uri} frameBorder="0" width="1280" height="1280" scrolling="no" sandbox="" />
            <a href={uri} target="_blank" className="templates__link">
                <ArrowUpRightSquare width={32} height={32} />
            </a>
            <DeleteSubmitModal button={DeleteButton} callback={removeHandler} />
        </Col>
    );
}

export default WhitePageElement;