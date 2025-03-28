import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import GeneratedWhitePageRow from "./GeneratedWhitePageRow";
import { ArrowClockwise } from "react-bootstrap-icons";
import { StoreContext } from "../../store/store";

const GeneratedWhitePageTable = () => {
    const { generatedWhitePageStore } = useContext(StoreContext);

    const clickHandler = () => generatedWhitePageStore.getAll();

    return (
        <>
            <Button variant="outline-primary" onClick={clickHandler}>
                <ArrowClockwise width={20} height={20} />
            </Button>
            <Table hover>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Шаблон</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        generatedWhitePageStore.whitePages.map((whitePage) =>
                            <GeneratedWhitePageRow whitePage={whitePage} key={"generatedwhitepage" + whitePage.id} />
                        )
                    }
                </tbody>
            </Table>
        </>
    );
}

export default observer(GeneratedWhitePageTable);