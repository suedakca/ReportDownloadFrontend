import CustomNavbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";


const AuthPage = ({pageName}) => {
    return (
        <div>
            <CustomNavbar/>
            <div style={{margin: "400px auto"}}>
                <h1
                    style={{
                        position: "absolute",
                        left: "45%",
                        top: "30%"
                    }}>
                    {pageName}
                </h1>
                { pageName === 'Register'
                    ? <AuthForm urlPath = '/auth/register' pageName= 'Register'/>
                    : <AuthForm urlPath= '/auth/login' pageName= 'Login' />
                }
            </div>
        </div>
    )
}

export default AuthPage;