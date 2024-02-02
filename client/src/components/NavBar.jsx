import React from 'react'
import styles from '../assets/css/navbar.module.css'
import { useNavigate } from 'react-router-dom'
function NavBar() {
    const navigate = useNavigate();
    return (

        <nav className={styles.navigacija}>
            <ul className={styles.navigacija__list}>
                <li className={styles.navigacija__item}><a href="/dashboard">Dashboard</a></li>
                <li className={styles.navigacija__item}><a href="/dashboard/monitor">Monitor</a></li>
                <li className={styles.navigacija__item}><a href="/dashboard/license">Licence</a></li>
                <li className={styles.navigacija__item}><a href="/dashboard/archive">Arhiva</a></li>
            </ul>
        </nav>
    )
}

export default NavBar