import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ListTable() {
    const [movies, setMovies] = useState([]);

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         const response = await fetch('http://localhost:8080/graphql', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 query: `
    //                     query {
    //                         movies {
    //                             id
    //                             title
    //                             year
    //                             type
    //                             imdbId
    //                         }
    //                     }
    //                 `
    //             })
    //         });
    //
    //         const result = await response.json();
    //         console.log("Movies result:", result);
    //         setMovies(result.data.movies);
    //     };
    //
    //     fetchMovies();
    // }, []);

    return (
        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Type</th>
                <th>IMDB ID</th>
            </tr>
            </thead>
            <tbody>
            {movies.map((movie, index) => (
                <tr key={movie.id}>
                    <td>{index + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.type}</td>
                    <td>{movie.imdbId}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default ListTable;