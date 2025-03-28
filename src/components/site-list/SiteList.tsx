import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";
import "../template-list/css/style.css";
import SiteElement from "./SiteElement";
import { StoreContext } from "../../store/store";

const SiteList = () => {
    const { siteStore } = useContext(StoreContext);

    return (
        <Row className="mt-5 templates">
            {
                siteStore.sites.map((site) => {
                    return <SiteElement site={site} key={`site${site.id}`} />
                })
            }
        </Row>
    );
}

export default observer(SiteList);
