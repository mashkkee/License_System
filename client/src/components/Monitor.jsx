import React, { useState } from 'react'
import CreateClient from './CreateClient'
import CreateParthner from './CreateParthner'
import styles from '../assets/css/monitor.module.css'
function Monitor() {
    const [modal, setModal] = useState(0)

    return (
        <>
            <button onClick={() => {setModal(1)}}>Dodaj Klijenta</button>
            <button onClick={() => {setModal(2)}}>Dodaj Partnera</button>
            <div className={styles.container}>
                {
                    modal === 1 ? <CreateClient/> : modal == 2 ? <CreateParthner/> : ""
                }
            </div>
        </>
    )
}

export default Monitor