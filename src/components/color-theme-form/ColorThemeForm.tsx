import { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { COLOR_THEMES } from "../../constants";
import changeTheme from "../../modules/color-theme/changeTheme";

const ColorThemeForm = () => {
    const [checked, setChecked] = useState(changeTheme());

    useEffect(() => {
        localStorage.setItem("colorTheme", checked ? COLOR_THEMES.dark : COLOR_THEMES.light);
        changeTheme();
    }, [checked]);

    const changeChecked = () => setChecked(!checked);

    return (
        <div>
            <h5>Цветовая тема</h5>
            <Form.Group>
                <Form.Label>
                    Включить темную тему
                </Form.Label>
                <Form.Check type="switch" label="Темная тема" checked={checked} onChange={changeChecked} />
            </Form.Group>
        </div>
    )
}

export default ColorThemeForm;