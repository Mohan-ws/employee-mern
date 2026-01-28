import {useNavigate, userNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
    };

    return (
        <div className="container">
        <h1>Login</h1> 

        <input placeholder="Username" />
        <input placeholder="password"
        type="password"/>
        <button onClick={handleLogin}>Login</button>

        
        </div>
    );
}
export default Login;