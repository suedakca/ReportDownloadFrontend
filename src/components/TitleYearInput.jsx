import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";

function TitleYearInput() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px'}}>

        <InputGroup size="sm" className="mb-3" style={{ width: '300px' , borderBottom: '1px solid #b6b6b6'}}>
            <InputGroup.Text id="inputGroup-sizing-sm">Title of Movie</InputGroup.Text>
            <Form.Control
                aria-label="Title"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                }}
                placeholder='Enter the movie name'
            />
        </InputGroup>

            <InputGroup size="sm" className="mb-3" style={{ width: '300px' , borderBottom: '1px solid #b6b6b6'}}>
            <InputGroup.Text id="inputGroup-sizing-sm">Year of Movie</InputGroup.Text>
            <Form.Control
                aria-label="Year"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                }}
                placeholder='Enter the movie year'
            />
        </InputGroup>
        </div>
    )
}

export default TitleYearInput;