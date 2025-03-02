import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../..";
import { Form } from "react-bootstrap";

const SelectGenerateTokenForm = () => {
    const { generateTokenStore } = useContext(StoreContext);

    const [token, setToken] = useState("");

    const handleChange = (value: string) => setToken(value);

    useEffect(() => {
        localStorage.setItem("generateToken", token);
    }, [token]);

    return (
        <div className="mt-2">
            <h5>White Page ключ</h5>
            <Form.Group className="mt-1">
                <Form.Label>
                    Выберите ключ, который будет использоваться для генераций White Page
                </Form.Label>
                <Form.Select 
                    defaultValue={localStorage.getItem("generateToken") || undefined}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    {
                        generateTokenStore.tokens.map((generateToken) =>
                            <option value={generateToken.token} key={"settingsgt" + generateToken.id}>
                                {generateToken.token.slice(-20)} | {generateToken.count} исп. осталось
                            </option>
                        )
                    }
                </Form.Select>
            </Form.Group>
        </div>
    );
}

export default observer(SelectGenerateTokenForm);