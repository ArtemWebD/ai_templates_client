import { Col } from "react-bootstrap";
import { SERVER_URL } from "../../constants";
import { Check } from "react-bootstrap-icons";
import { IWhitePageElementParams } from "./whitePageElementParams";

const WhitePageElement = ({ whitePage, checked, onClick }: IWhitePageElementParams) => {
    const { id, title, path } = whitePage;
    const url = new URL(path, SERVER_URL);
    const uri = url + `?id=${id}`;

    return (
        <Col onClick={onClick}>
            <h3>{title}</h3>
            <iframe className="mt-2" src={uri} frameBorder="0" width="1280" height="1280" scrolling="no" sandbox="" />
            <div className="templates__select">
                <Check width={32} height={32} fill={checked ? "green" : "inherit"} />
            </div>
        </Col>
    );
}

export default WhitePageElement;