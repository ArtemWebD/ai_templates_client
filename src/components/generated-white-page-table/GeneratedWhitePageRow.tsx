import { SERVER_URL } from "../../constants";
import { GeneratedWhitePageStatus, IGeneratedWhitePage } from "../../services/generated-white-page/generatedWhitePageInterface";

const GeneratedWhitePageRow = ({ whitePage }: { whitePage: IGeneratedWhitePage }) => {
    const { title, whitePageTitle, status } = whitePage;
    const downloadUrl = new URL(`/static/ready/${title}.zip`, SERVER_URL);

    return (
        <tr>
            <th>{title}</th>
            <th>{whitePageTitle}</th>
            <th>{status}</th>
            <th>
                {
                    (status === GeneratedWhitePageStatus.completed) && <a href={downloadUrl.toString()}>Скачать</a>
                }
            </th>
        </tr>
    );
}

export default GeneratedWhitePageRow;