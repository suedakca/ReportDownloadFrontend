import CustomNavbar from "../components/Navbar";
import {decryptData} from "../features/utils/encryptData";
import {Button} from "react-bootstrap";
import { jwtDecode }  from "jwt-decode";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const usernameEncrypted = localStorage.getItem("username");
    const username = decryptData(usernameEncrypted);
    const navigate = useNavigate();
    const tokenEncrypted = localStorage.getItem("token");
    const token = decryptData(tokenEncrypted);
    const decoded = jwtDecode(token);
    const role = decoded.roles[0];
    console.log("Role: ", role);
    return (
        <div>
            <CustomNavbar/>
            <h1 style={{
                position: 'absolute',
                left: '40vw',
                top: '10vw'
            }}>
                Welcome {username}
            </h1>

            <div style={{
                position: "absolute",
                left: "45vw",
                top: "20vw",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                {["ROLE_USER", "ROLE_ADMIN"].includes(role) && (
                    <>
                        <Button onClick={() => navigate("/homework")}>Open Homework Page</Button>
                        <Button onClick={() => navigate("/movie")}>Open Movie Page</Button>
                    </>
                )}

                {role === "ROLE_TEACHER" && (
                    <Button onClick={() => navigate("/homework")}>Open Homework Page</Button>
                )}

                {role === "ROLE_DIRECTOR" && (
                    <Button onClick={() => navigate("/movie")}>Open Movie Page</Button>
                )}
            </div>


        </div>
    )
}

export default HomePage;