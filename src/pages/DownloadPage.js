import React, {useState} from "react";
import CustomCard from "../components/CustomCard";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import {logout} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import ListTable from "../components/ListTable";
import axios from "../api/axios";
import TypeRadioButton from "../components/TypeRadioButton";
import TitleYearInput from "../components/TitleYearInput";

const DownloadPage = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const downloadReport = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/api/report/homeworks");
            if(handleDownloadResult()) {
                handleDownloadResult(true);
            }
        }catch (e) {
            console.log(e);
            if(handleDownloadResult()){
                handleDownloadResult(false);
            }
        }
    }

    return (
      <div style={{margin: '100px auto', width: '1050px'}}>
          <Button onClick={downloadReport} variant="primary" style={{
              position: 'fixed',
              top: 70,
              right: 10,
              minWidth: "100px"
          }}>Download Report</Button>
          <div>
            <TypeRadioButton/>
            <TitleYearInput/>
          </div>
          <ListTable />
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
          <Button  variant="secondary"
                   onClick={handleLogout}
                   style={{
              position: 'fixed',
              top: 20,
              right: 10,
              minWidth: "100px"
          }}>Logout</Button>

      </div>
    );
}

export default DownloadPage;