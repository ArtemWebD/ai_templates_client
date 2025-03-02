import { Button, Form, FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import { IAuthFormParams } from "./AuthFormParams";
import { useContext } from "react";
import { StoreContext } from "../..";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const AuthForm = ({ isEnter }: IAuthFormParams) => {
    const { authStore } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleAction = async (formData: FormData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
            return;
        }

        if (isEnter) {
            await authStore.login(email, password);
        } else {
            const name = formData.get("name");

            if (typeof name !== "string") {
                return;
            }

            await authStore.register(email, name, password);
        }

        if (authStore.isAuth) {
            navigate("/");
        }
    }

    const NameInput = () => {
        return isEnter ? <></> : (
            <FormGroup className="mt-2">
                <FormLabel>Имя</FormLabel>
                <FormControl type="text" name="name" placeholder="Введите имя" maxLength={30} required />
                <FormText className="text-muted">
                    Введите ваше имя
                </FormText>
            </FormGroup>
        )
    }

    return (
        <Form className={"auth__form" + (isEnter ? "" : " auth__form_active")} action={handleAction}>
            <h2>{isEnter ? "Вход" : "Регистрация"}</h2>
            <FormGroup>
                <FormLabel>Email адрес</FormLabel>
                <FormControl type="email" name="email" placeholder="Введите email" maxLength={30} required />
                <FormText className="text-muted">
                    Введите свой email
                </FormText>
            </FormGroup>
            <NameInput  />
            <FormGroup className="mt-2">
                <FormLabel>Пароль</FormLabel>
                <FormControl type="password" name="password" placeholder="Пароль" minLength={6} maxLength={30} required />
                <FormText className="text-muted">
                    Введите свой пароль
                </FormText>
            </FormGroup>
            <Button variant="primary" type="submit" className="mt-2">
                { isEnter ? "Войти" : "Зарегистрироваться" }
            </Button>
        </Form>
    );
}

export default observer(AuthForm);