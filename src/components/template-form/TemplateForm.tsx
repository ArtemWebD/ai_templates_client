import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { StoreContext } from "../../store/store";

const TemplateForm = () => {
    const { templateStore } = useContext(StoreContext);

    const actionHandler = async (formData: FormData) => {
        const data = new FormData();
        const title = formData.get("title");
        const site = formData.get("site");

        if (!title || !site || !(site instanceof File)) {
            return;
        }

        data.set("title", title);
        data.set("site", site);

        await templateStore.create(data);
    }

    return (
        <Form className="mt-3" action={actionHandler}>
            <Form.Group>
                <Form.Label>Название шаблона</Form.Label>
                <Form.Control type="text" placeholder="Введите название шаблона" name="title" maxLength={30} required />
                <Form.Text className="text-muted">
                    Название, которое будет отображаться в списке шаблонов
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Шаблон</Form.Label>
                <Form.Control type="file" accept=".zip" name="site" required />
                <Form.Text className="text-muted">
                    Архив шаблона сайта
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
                Загрузить
            </Button>
        </Form>
    );
}

export default TemplateForm;