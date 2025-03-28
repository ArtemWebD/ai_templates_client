import { Form } from "react-bootstrap";
import { IGenerateToken } from "../../services/generate-token/generateTokenInterface";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../store/store";

const GenerateTokenElement = ({ token }: { token: IGenerateToken }) => {
    const { count, createdAt, id } = token;
    const createdAtNumber = Date.parse(createdAt);
    const createdAtDate = new Date(createdAtNumber);

    const { generateTokenStore } = useContext(StoreContext);

    const actionHandler = async (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const number = formData.get("count");

        if (!number || isNaN(+number) || count === +number) {
            return;
        }

        await generateTokenStore.increaseCount(id, token.token, +number - count);
    }

    return (
        <tr>
            <th>{token.token.slice(-20)}</th>
            <th>
                <form onSubmit={actionHandler}>
                    <Form.Control type="number" name="count" min={count} max={9999} defaultValue={count} />
                </form>
            </th>
            <th>{createdAtDate.toLocaleDateString("ru-RU")}</th>
        </tr>
    );
}

export default observer(GenerateTokenElement);