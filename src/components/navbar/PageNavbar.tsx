import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { StoreContext } from "../..";
import { Link } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";
import IconModalButton from "../modal-button/IconModalButton";
import Settings from "../settings/Settings";

const PageNavbar = () => {
    const { authStore } = useContext(StoreContext);
    const pathname = window.location.pathname === "/" ? "" : "/";

    useEffect(() => {
        authStore.checkAdmin();
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ position: "sticky", left: "0", top: "0", zIndex: "99" }}>
            <Container>
                <Navbar.Brand href="#">AI Генерация</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={pathname + "#templateUpload"}>Загрузка шаблона</Nav.Link>
                        <Nav.Link href={pathname + "#templates"}>Шаблоны</Nav.Link>
                        <Nav.Link href={pathname + "#siteUpload"}>Загрузка сайта</Nav.Link>
                        <Nav.Link href={pathname + "#sites"}>Сайты</Nav.Link>
                        <Nav.Link href={pathname + "#whitePages"}>White Page</Nav.Link>
                        {authStore.isAdmin && <Link to={"/admin"} className="nav-link">
                            Панель администратора
                        </Link>}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <IconModalButton 
                            icon={<Gear width={24} height={24} style={{ cursor: "pointer" }} />}
                            modalTitle="Настройки"
                            modalBody={<Settings />}
                        />
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    );
}

export default observer(PageNavbar);