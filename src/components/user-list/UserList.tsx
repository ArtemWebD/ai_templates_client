import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Table } from "react-bootstrap";
import { StoreContext } from "../..";
import UserElement from "./UserElement";

const UserList = () => {
    const { authStore } = useContext(StoreContext);

    return (
        <Table hover bordered striped>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Имя</th>
                    <th>Привилегии</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    authStore.users.map((user) =>
                        <UserElement user={user} key={"user" + user.id} />
                    )
                }
            </tbody>
        </Table>
    );
}

export default observer(UserList);