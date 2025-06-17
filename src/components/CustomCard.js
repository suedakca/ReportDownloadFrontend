import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CustomCard() {
    return (
        <Card>
            <Card.Header>Download Report</Card.Header>
            <Card.Body>
                <Card.Title>Welcome Sueda Akça</Card.Title>
                <Card.Text>
                    Please click button and wait to download detailed homeworks' assignments report
                </Card.Text>
                <Button variant="primary">Download Report</Button>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;