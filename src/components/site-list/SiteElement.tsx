import { Col } from "react-bootstrap";
import { SERVER_URL } from "../../constants";
import { ArrowUpRightSquare, Trash } from "react-bootstrap-icons";
import { useContext } from "react";
import { StoreContext } from "../..";
import { ISite } from "../../services/site/siteInterface";

const SiteElement = ({ site }: { site: ISite }) => {
    const { siteStore } = useContext(StoreContext);

    const { id, title, path } = site;
    const url = new URL(path, SERVER_URL);
    const uri = url + `?id=${id}`;

    const removeHandler = async () => {
        await siteStore.remove(id);
    }

    return (
        <Col>
            <h3>{title}</h3>
            <iframe className="mt-2" src={uri} frameBorder="0" width="1280" height="1280" scrolling="no" sandbox="" />
            <a href={uri} target="_blank" className="templates__link">
                <ArrowUpRightSquare width={32} height={32} />
            </a>
            <div className="templates__delete" onClick={removeHandler}>
                <Trash width={32} height={32} />
            </div>
        </Col>
    );
}

export default SiteElement;