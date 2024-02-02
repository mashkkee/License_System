import React, { useState } from 'react'
import styles from '../assets/css/login.module.css'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {

        e.preventDefault()

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/api/auth/', { email, password }).then(async res => {

            if (res.data.token) {
                login(res.data.token)
                location.reload()
                


            }
        })
    };

    return (
        <div className={styles.containermain}>
            <div className={styles.container}>
                <h1>Prijava</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email" className={styles.label}>

                        E-mail

                        <input

                            type="email"

                            id="email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />

                    </label>

                    <label htmlFor="password" className={styles.label}>

                        Šifra

                        <input

                            type="password"

                            id="password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}

                        />

                    </label>

                    <button className={styles.submit} type="submit">Prijavi se</button>

                </form>
            </div>
        </div>
    );

}

export default Login