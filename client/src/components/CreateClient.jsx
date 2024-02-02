import React, { useState, useEffect } from "react";
import styles from "../assets/css/client.module.css"
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { socket } from "../socket/Socket";

export default function CreateClient() {


  const [phoneNumber, setPhoneNumber] = useState("");
  const [partners, setPartners] = useState([])

  useEffect(() => {
    socket.emit('fetchPartners');
    socket.on('fetchedPartners', data => {
      setPartners(data)
    })
  }, [])

  const [values, setValues] = useState({
    name: "",
    pib: 0,
    email: "",
    phone: 0,
    parthner_id: "",
    date_created: `${new Date().toUTCString()}`,
  });

  function handleClick(e) {
    e.preventDefault()

    socket.emit('clientCreated', values);
  }
  function onHandleChange(event) {
    let date = new Date()
    date.setDate(date.getDate() + 30);
    setValues((prev) => ({
      ...prev,
      [event.target.name]: `${[event.target.value]}`,
      date_expiried: date.toUTCString(),
    }));

  }

  function handlePhoneChange(value) {
    setPhoneNumber(value);
    onHandleChange({ target: { name: "phone", value: value } });
  }
  // function generateRandomTaxNumber() {
  //   // Generišemo devetocifreni nasumičan broj
  //   const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;

  //   return randomNumber.toString(); // Pretvaramo broj u string
  // }

  // const randomTaxNumber = generateRandomTaxNumber();
  // console.log(randomTaxNumber);




  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <form action="">
          <h2 className={styles.form_heading}>Dodaj novog klijenta</h2>

          <label>Naziv klijenta:</label>
          <input
            onChange={onHandleChange}
            type="text"
            id="nazivKlijenta"
            name="name"
          />

          <h3>PIB*</h3>
          <label>Poreski identifikacioni broj, primer: 123456789</label>
          <input
            onChange={onHandleChange}
            type="text"
            id="pib"
            name="pib"
            pattern="[0-9]{9}"
          />

          {/* Treći input: Email */}
          <label htmlFor="email">Email:</label>
          <input
            onChange={onHandleChange}
            type="email"
            id="email"
            name="email"
          />

          {/* Broj telefona */}
          <div className={`${styles.phone_input_container}`}>
            <label htmlFor="phoneNumber">Broj telefona:</label>
            <PhoneInput
              name="number"
              international
              id="phoneNumber"
              placeholder="Unesite broj telefona"
              onChange={handlePhoneChange}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div className={styles.dodela}>
            <h3>Izaberite Partnera</h3>
            <select onChange={onHandleChange} name="parthner_id">
              <option value="" >Izaberite Parnera</option>
              {partners.map((partner) => (
                <option key={partner.parthner_id} value={partner.parthner_id}>
                  ({partner.parthner_id}) {partner.name[0].toUpperCase() + partner.name.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.btns}>
            <button className={`${styles.btn1} ${styles.btn}`}>Otkazi</button>
            <button onClick={handleClick} className={`${styles.btn} ${styles.btn2}`}>
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
