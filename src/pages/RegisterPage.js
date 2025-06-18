import RegisterForm from "../components/RegisterForm";
import CustomNavbar from "../components/Navbar";

const RegisterPage = () => {
    return (
        <div>
            <CustomNavbar/>
            <div style={{margin: "450px auto"}}>
                <h1
                style = {{
                    position: "absolute",
                    left: "38%",
                    top: "30%"
                }}>
                    Register New Teacher
                </h1>
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage;