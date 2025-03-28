import { Container } from "react-bootstrap";
import AuthForm from "../../components/auth/AuthForm";
import "./css/style.css";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/store";

const AuthPage = () => {
    const [isEnter, setEnter] = useState(true);
    const { authStore } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            await authStore.refresh();

            if (authStore.isAuth) {
                navigate("/");
            }
        }

        checkAuth();
    }, []);

    return (
        <Container className="auth pt-5">
            <div className="d-flex">
                <AuthForm isEnter={isEnter} />
                <div className={"auth__change d-flex justify-content-center align-items-center" + (isEnter ? "" : " auth__change_active")}>
                    <button className={ "btn btn-outline-light btn-lg"} onClick={() => setEnter(!isEnter)}>
                        {isEnter ? "Зарегистрироваться" : "Войти"}
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default observer(AuthPage);