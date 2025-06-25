import {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function TypeDropdown( {onSelect}) {
    const [selectedOption, setSelectedOption] = useState("");


    return (
        <div style = {{
            display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px'
        }}>
            <p style={{ margin: 0}}>
                Movie Type:
            </p>
            <DropdownButton
                id="dropdown-movie-type"
                variant="secondary"
                title={selectedOption ? selectedOption : "Select Movie Type"}
                onSelect={(eventKey) => {
                    setSelectedOption(eventKey)
                    onSelect(eventKey)
                    }
                }
            >
                <Dropdown.Item eventKey="Movie">Movie</Dropdown.Item>
                <Dropdown.Item eventKey="Series">Series</Dropdown.Item>
                <Dropdown.Item eventKey="Episode">Episode</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default TypeDropdown;