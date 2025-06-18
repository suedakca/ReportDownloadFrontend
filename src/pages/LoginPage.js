import CustomNavbar from "../components/Navbar";
import Form from "../components/LoginForm";


const LoginPage = () => {
    return (
        <div>
            <CustomNavbar/>
            <div style={{margin: "400px auto"}}>
                <h1
                    style={{
                        position: "absolute",
                        left: "47%",
                        top: "30%"
                    }}>
                    Login
                </h1>
                <Form/>
            </div>
        </div>
    )
}

export default LoginPage;