import React, { useEffect, useState } from 'react';
import { Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import License from './components/License'
import './App.css';
import axios from 'axios';
import ReactLoading from 'react-loading'
import styles from './assets/css/app.module.css'
import Monitor from './components/Monitor';
import { socket } from './socket/Socket';

function App() {
  const token = localStorage.getItem('token')
  const [valid, setValid] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function isAuthorized() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/verify', { token });
        if (response.data.valid) {
          setValid(true)
          setLoading(false)
          socket.connect()
        } else {

        }

      } catch (error) {
        setValid(false)
        setLoading(false)
      }
    }
    isAuthorized()
  }, [])



  return (
    <AuthProvider>
      {
        loading ? (
          <ReactLoading className={styles.loading}  type="spin" color="blue" height={50} width={50} />
        ) : (
          <>
            {valid && <NavBar />}
            <Routes>
              <Route path="/login" element={valid ? <Navigate to="/dashboard" /> : <Login />} />
              <Route
                path="/dashboard"
                element={valid ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/"
                element={valid ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard/license"
                element={valid ? <License /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard/monitor"
                element={valid ? <Monitor /> : <Navigate to="/login" />}
              />
            </Routes>
          </>
        )
      }

    </AuthProvider >
  );
}

export default App;
