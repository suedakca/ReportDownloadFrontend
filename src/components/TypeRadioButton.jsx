import {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function TypeRadioButton() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div style = {{
            display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px'
        }}>
            <p style={{ margin: 0}}>
                Movie Type:
            </p>
            <DropdownButton
                id="dropdown-movie-type"
                variant="secondary"
                title={selectedOption ? selectedOption : "Select Movie Type"}
                onSelect={(eventKey) => setSelectedOption(eventKey)}
            >
                <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                <Dropdown.Item eventKey="Sci-Fi">Sci-Fi</Dropdown.Item>
                <Dropdown.Item eventKey="Drama">Drama</Dropdown.Item>
                <Dropdown.Item eventKey="Romance">Romance</Dropdown.Item>
                <Dropdown.Item eventKey="Comedy">Comedy</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default TypeRadioButton;