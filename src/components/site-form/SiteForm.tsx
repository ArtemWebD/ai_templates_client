import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { StoreContext } from "../..";
import TemplateSelect from "../template-select/TemplateSelect";

const SiteForm = () => {
    const { siteStore } = useContext(StoreContext);

    const actionHandler = async (formData: FormData) => {
        const title = formData.get("title");
        const templateId = formData.get("templateId");

        if (!title || !templateId || typeof title !== "string" || isNaN(+templateId)) {
            return;
        }

        await siteStore.create(title, +templateId);
    }

    return (
        <Form className="mt-3" action={actionHandler}>
            <Form.Group>
                <Form.Label>Название сайта</Form.Label>
                <Form.Control type="text" placeholder="Введите название сайта" name="title" maxLength={30} required />
                <Form.Text className="text-muted">
                    Название, которое будет отображаться в списке сайтов
                </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Шаблон</Form.Label>
                <TemplateSelect name="templateId" />
                <Form.Text className="text-muted">
                    Выберите шаблон, по которому будет создаваться сайт
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
                Загрузить
            </Button>
        </Form>
    );
}

export default SiteForm;