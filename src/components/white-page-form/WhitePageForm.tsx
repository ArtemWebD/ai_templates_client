import { observer } from "mobx-react-lite"
import { Button, Form } from "react-bootstrap";
import WhitePageSelect from "../white-page-select/WhitePageSelect";
import { useContext, useState } from "react";
import { StoreContext } from "../..";
import HelpButton from "../help-button/HelpButton";

const WhitePageForm = () => {
    const { generatedWhitePageStore } = useContext(StoreContext);
    const [id, setId] = useState(NaN);

    const handleAction = async (formData: FormData) => {
        const language = formData.get("language");
        const country = formData.get("country");
        const company = formData.get("company");
        const description = formData.get("description");
        const site = formData.get("site");

        if (!language || !country || !company || !description || !site || isNaN(id)) {
            return;
        }

        const prompt = `
            Язык: ${language};\n
            Страна: ${country};\n
            Название бренда: ${company};\n
            Описание бренда: ${description};\n
            Требования к генерации: ${site}
        `;

        await generatedWhitePageStore.create(id, prompt);
    }

    return (
        <Form action={handleAction}>
            <Form.Group>
                <Form.Label>Язык</Form.Label>
                <Form.Control type="text" placeholder="Введите язык" name="language" maxLength={20} required />
                <Form.Text className="text-muted">
                    Выберите язык, на котором будет производиться генерация
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Страна</Form.Label>
                <Form.Control type="text" placeholder="Введите страну" name="country" maxLength={30} required />
                <Form.Text className="text-muted">
                    Введите страну, с которой будет ассоциироваться запрос
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Название компании</Form.Label>
                <Form.Control type="text" placeholder="Введите название компании" name="company" maxLength={50} required />
                <Form.Text className="text-muted">
                    Название вашей компании или бренда
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Описание компании</Form.Label>
                <Form.Control as={"textarea"} rows={5} placeholder="Введите описание компании" name="description" maxLength={200} required />
                <Form.Text className="text-muted">
                    Опишите вашу компанию или бренд (сфера деятельности, преимущества и т.д.)
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Описание сайта</Form.Label>
                <Form.Control as={"textarea"} rows={6} placeholder="Введите описание сайта" name="site" maxLength={300} required />
                <Form.Text className="text-muted">
                    Напишите, на чем сделать акцент при генерации сайта
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <WhitePageSelect onSelect={(id) => setId(id)} />
            </Form.Group>
            <div className="d-flex align-items-center mt-3">
                <Button variant="primary" type="submit" style={{ marginRight: "5px" }}>
                    Создать
                </Button>
                <HelpButton 
                    text="
                        Для генерации требуются токены. Выберите свой токен в настройках, если они отсутствуют,
                        запросите создание у администратора
                    " 
                />
            </div>
        </Form>
    );
}

export default observer(WhitePageForm);