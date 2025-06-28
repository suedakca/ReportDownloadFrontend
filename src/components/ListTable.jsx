import {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import {movieApi, homeworkApi} from "../api/axios";

function ListTable({ type , movies}) {
    const [allData, setData] = useState([]);
    const headers = type === 'movie' ? ["#", "Title", "Year", "Genre", "IMDB Rating"]
    : [   "Öğretmen", "Ödev Adı", "Gönderilme Tarihi", "Sınıf", "Öğrenci Sayısı",
            "Başlama Tarihi", "Bitiş Tarihi", "Tamamlanma Yüzdesi", "Başarı Yüzdesi"];
    console.log(movies);
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            let response;
            if (type === "movie") {
                response = await movieApi.get("/api/all");
            } else {
                response = await homeworkApi.get("/api/report/all-hw");
            }
            const result = await response.data;
            setData(result);
        };

        if(movies.length > 0) setData(movies);
        else fetchData();
    }, [type, movies]);

    return (
        <Table responsive striped bordered hover style={{width: '100vw'}}>
            <thead>
            <tr>
                {headers.map((header, i) => (
                    <th>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {allData.map((data, index) => (
                <tr key={data.id}>
                    {type === 'movie' ?  (
                        <>
                        <td>{index + 1}</td>
                        <td>{data.title}</td>
                        <td>{data.year}</td>
                        <td>{data.genre}</td>
                        <td>{data.imdbRating}</td>
                        </>
                    ) : (
                        <>
                            <td>{data.fullName}</td>
                            <td>{data.homeworkName}</td>
                            <td>{formatDate(data.createDate)}</td>
                            <td>{data.classroom}</td>
                            <td>{data.studentCount}</td>
                            <td>{formatDate(data.startDate)}</td>
                            <td>{formatDate(data.endDate)}</td>
                            <td>{data.completionPercentage}</td>
                            <td>{data.successPercentage}</td>
                        </>
                    )}

                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default ListTable;