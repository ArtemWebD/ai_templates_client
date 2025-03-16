import ColorThemeForm from "../color-theme-form/ColorThemeForm";
import DeleteSubmitForm from "../delete-submit-form/DeleteSubmitForm";
import SelectGenerateTokenForm from "../select-generate-token-form/SelectGenerateTokenForm";

const Settings = () => {
    return (
        <>
            <ColorThemeForm />
            <br />
            <DeleteSubmitForm />
            <br />
            <SelectGenerateTokenForm />
        </>
    );
}

export default Settings;