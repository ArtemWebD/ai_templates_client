import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { StoreContext } from "../..";
import GenerateTokenElement from "./GenerateTokenElement";
import HelpButton from "../help-button/HelpButton";

const GenerateTokenList = ({ userId }: { userId: number }) => {
    const { generateTokenStore } = useContext(StoreContext);

    useEffect(() => {
        generateTokenStore.getAllByUser(userId);
    }, [userId]);

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Токен</th>
                    <th>
                        <div className="d-flex align-items-center">
                            <div style={{ marginRight: "5px" }}>Количество использований</div>
                            <HelpButton 
                                text="
                                    Количество использований токена можно изменить в таблице. Для сохранения
                                    изменений нажмите Enter после ввода значения
                                " 
                            />
                        </div>
                    </th>
                    <th>Дата создания</th>
                </tr>
            </thead>
            <tbody>
                {
                    generateTokenStore.userTokens.map((token) =>
                        <GenerateTokenElement token={token} key={"usergeneratetoken" + token.id} />
                    )
                }
            </tbody>
        </Table>
    );
}

export default observer(GenerateTokenList);