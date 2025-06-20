import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "../api/axios";
import {useSelector} from "react-redux";
import {decryptData} from "../features/utils/encryptData";

function CustomCard( { onDownloadResult }) {
    const downloadReport = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/api/report/homeworks");
            if(onDownloadResult) {
                onDownloadResult(true);
            }
        }catch (e) {
            console.log(e);
            if(onDownloadResult){
                onDownloadResult(false);
            }
        }
    }

    const username = useSelector((state) => state.auth.username);

    return (
        <Card>
            <Card.Header>Download Report</Card.Header>
            <Card.Body>
                <Card.Title>Welcome {username}</Card.Title>
                <Card.Text>
                    Please click button and wait to download detailed homeworks' assignments report
                </Card.Text>
                <Button onClick={downloadReport} variant="primary">Download Report</Button>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;