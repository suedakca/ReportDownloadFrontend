import React, {useState} from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import ListTable from "../components/ListTable";
import {movieApi} from "../api/axios";
import TitleYearInput from "../components/TitleYearInput";
import MenuSidebar from "../components/MenuSidebar";

const MoviePage = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const [movies, setMovies] = useState([]);
    const handleDownloadResult = (success) => {
        if (success) {
            setToastVariant("success");
            setToastMessage("İndirme başarılı! 📥");
        } else {
            setToastVariant("danger");
            setToastMessage("İndirme başarısız! 🚫");
        }
        setShowToast(true);
    };

    const downloadReport = async (e) => {
        e.preventDefault();
        try {
            const response = await movieApi.get("/api/report-download" , {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "movie.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            if(handleDownloadResult) {
                handleDownloadResult(true);
            }
        }catch (e) {
            console.log(e);
            if(handleDownloadResult){
                handleDownloadResult(false);
            }
        }
    }

    return (
      <div style={{margin: '100px auto', width: '1050px'}}>
          <MenuSidebar/>

          <Button onClick={downloadReport} variant="primary" style={{
              position: 'fixed',
              top: 70,
              right: 10,
              minWidth: "100px"
          }}>Download Report</Button>
          <div>
            <TitleYearInput setMovies={setMovies}/>
          </div>
          <ListTable type='movie' movies={movies}/>
          <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
              bg={toastVariant}
              style={{
                  position: 'fixed',
                  top: 80,
                  right: 20,
                  minWidth: "200px"
              }}
          >
              <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>

      </div>
    );
}

export default MoviePage;