import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import TypeDropdown from "./TypeDropdown";
import {useState} from "react";
import {movieApi} from "../api/axios";

function TitleYearInput({ setMovies }) {
    const [selectedType, setSelectedType] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [imdbId, setImdbId] = useState("");

    const searchMovie = () => {
        const requestBody = {
            type: selectedType !== "" ? selectedType : null,
            year: year !== "" ? year : null,
            title: title !== "" ? title : null,
            imdbId: imdbId !== "" ? imdbId :null,
        };

        console.log("Search Request:", requestBody);

        movieApi.post('/api/search-movie', requestBody)
            .then(response => {
                console.log("Response:", response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <TypeDropdown onSelect={(eventKey) => setSelectedType(eventKey)} />
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </InputGroup>

                <InputGroup size="sm" className="mb-3" style={{ width: '300px' , borderBottom: '1px solid #b6b6b6'}}>
                    <InputGroup.Text id="inputGroup-sizing-sm">IMDB Id of Movie</InputGroup.Text>
                    <Form.Control
                        aria-label="imdbId"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                        }}
                        placeholder='Enter the movie imdb id'
                        value={imdbId}
                        onChange={(e) => setImdbId(e.target.value)}
                    />
                </InputGroup>
                <Button type='submit' onClick={searchMovie}>Search</Button>
            </div>
        </div>
    )
}

export default TitleYearInput;