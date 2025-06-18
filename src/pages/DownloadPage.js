import React, {useState} from "react";
import CustomCard from "../components/CustomCard";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import {logout} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

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

    return (
      <div style={{margin: '350px auto', width: '500px'}}>
          <CustomCard onDownloadResult={handleDownloadResult}/>
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