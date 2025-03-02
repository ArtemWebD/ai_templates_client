import { IUser } from "../../services/user/userInterfaces";
import GenerateTokenForm from "../generate-token-form/GenerateTokenForm";
import GenerateTokenList from "../generate-token-list/GenerateTokenList";
import ModalButton from "../modal-button/ModalButton";

const UserElement = ({ user }: { user: IUser }) => {
    const { email, name, type, id } = user;

    return (
        <tr>
            <th>{email}</th>
            <th>{name}</th>
            <th>{type}</th>
            <th>
                <ModalButton 
                    text="White Page токены" 
                    modalTitle="White Page токены" 
                    modalBody={
                        <>
                            <h5 className="mb-2">Создать токен</h5>
                            <GenerateTokenForm userId={id} />
                            <GenerateTokenList userId={id} />
                        </>
                    } 
                />
            </th>
        </tr>
    );
}

export default UserElement;