import { useContext, useEffect } from "react";
import { StoreContext } from "../..";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PageNavbar from "../../components/navbar/PageNavbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import TemplateForm from "../../components/template-form/TemplateForm";
import TemplateList from "../../components/template-list/TemplateList";
import SiteForm from "../../components/site-form/SiteForm";
import SiteList from "../../components/site-list/SiteList";
import ModalButton from "../../components/modal-button/ModalButton";
import WhitePageForm from "../../components/white-page-form/WhitePageForm";
import GeneratedWhitePageTable from "../../components/generated-white-page-table/GeneratedWhitePageTable";

const MainPage = () => {
    const { authStore, templateStore, siteStore, whitePageStore, generatedWhitePageStore } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            await authStore.refresh();

            if (!authStore.isAuth) {
                navigate("/authorization");
            }
        }

        checkAuth();
    }, []);

    useEffect(() => {
        templateStore.getAll();
        siteStore.getAll();
        whitePageStore.getAll();
        generatedWhitePageStore.getAll();
    }, []);

    return (
        <>
            <PageNavbar />
            <section className="mt-5" id="whitePages">
                <Container>
                    <h2>Создать White Page</h2>
                    <p>
                        Создайте свой сайт по шаблону, написав тему для ИИ
                    </p>
                    <Row>
                        <Col>
                            <ModalButton text="Создать" modalTitle="Создать White Page" modalBody={<WhitePageForm />} />
                        </Col>
                        <Col>
                            <ModalButton 
                                text="Сгенерированные шаблоны" 
                                modalTitle="Очередь генерации" 
                                modalBody={<GeneratedWhitePageTable />} 
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="mt-5" id="templateUpload">
                <Container>
                    <h2>Загрузить шаблон</h2>
                    <TemplateForm />
                </Container>
            </section>
            <section className="mt-5" id="templates">
                <Container>
                    <h2>Список шаблонов</h2>
                    <TemplateList />
                </Container>
            </section>
            <section className="mt-5" id="siteUpload">
                <Container>
                    <h2>Создать сайт</h2>
                    <SiteForm />
                </Container>
            </section>
            <section className="mt-5" id="sites">
                <Container>
                    <h2>Список сайтов</h2>
                    <SiteList />
                </Container>
            </section>
        </>
    );
}

export default observer(MainPage);