import {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import {reportApi} from "../api/axios";

function ListTable({ movies }) {
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await reportApi("/api/all");
            const result = await response.json();
            console.log("All Movies result:", result);
            setAllMovies(result);
        };

        if (!movies || movies.length === 0) {
            fetchMovies();
        }
    }, [movies]);

    const displayedMovies = (movies && movies.length > 0) ? movies : allMovies;


    return (
        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Genre</th>
                <th>IMDB Rating</th>
            </tr>
            </thead>
            <tbody>
            {displayedMovies.map((movie, index) => (
                <tr key={movie.id}>
                    <td>{index + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.imdbRating}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default ListTable;