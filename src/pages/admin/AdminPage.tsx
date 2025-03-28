import { Container } from "react-bootstrap";
import PageNavbar from "../../components/navbar/PageNavbar";
import ModalButton from "../../components/modal-button/ModalButton";
import WhitePageAdminForm from "../../components/white-page-admin-form/WhitePageAdminForm";
import WhitePageList from "../../components/white-page-list/WhitePageList";
import { useContext, useEffect } from "react";
import UserList from "../../components/user-list/UserList";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/store";

const AdminPage = () => {
    const { whitePageStore, authStore } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            await authStore.checkAdmin();

            if (!authStore.isAdmin) {
                navigate("/");
            }
        }

        checkAdmin();
        whitePageStore.getAll();
        authStore.getAll();
    }, []);

    return (
        <>
            <PageNavbar />
            <section className="mt-5">
                <Container>
                    <h2>Шаблоны White Page</h2>
                    <p className="mt-3">
                        Использовать шаблон могут пользователи с любым уровнем привилегий, 
                        изменение списка шаблонов будет отображаться у всех пользователей
                    </p>
                    <ModalButton text="Добавить шаблон" modalTitle="Шаблон White Page" modalBody={<WhitePageAdminForm />} />
                    <WhitePageList />
                </Container>
            </section>
            <section className="mt-5">
                <Container>
                    <h2>Список пользователей</h2>
                    <UserList />
                </Container>
            </section>
        </>
    );
}

export default AdminPage;