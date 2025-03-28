import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { StoreContext } from "../../store/store";

const GenerateTokenForm = ({ userId }: { userId: number }) => {
    const { generateTokenStore } = useContext(StoreContext);

    const actionHandler = async (formData: FormData) => {
        const count = formData.get("count");

        if (!count || isNaN(+count)) {
            return;
        }

        await generateTokenStore.create(userId, +count);
    }

    return (
        <Form action={actionHandler}>
            <Form.Group>
                <Form.Label>
                    Количество использований
                </Form.Label>
                <Form.Control type="number" name="count" min={1} max={9999} defaultValue={1} />
                <Form.Text className="text-muted">
                    Введите количество генераций, которые можно произвести по токену
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2 mb-3">
                Создать
            </Button>
        </Form>
    );
}

export default GenerateTokenForm;