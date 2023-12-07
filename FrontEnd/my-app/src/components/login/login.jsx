import React from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import loginAPI from "../../api/loginAPI";

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/login', { username: username, password: password });
            const response = await loginAPI.login(username, password)
            localStorage.setItem('auth', response.token);
            navigate('/');
        } catch (error) {
            console.error('Erro na autenticação', error);
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h3>Login Here</h3>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                <input className = "bt" type="submit" value="Login" />
            </form>
        </div>
    );
}