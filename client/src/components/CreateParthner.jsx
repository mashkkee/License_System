import React, { useState } from "react";
import styles from "../assets/css/partner.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Dodajte ovu liniju da biste uključili stilove za react-phone-number-input
import { socket } from "../socket/Socket";

export default function CreateParthner() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [values, setValues] = useState({
    name: "",
    pib: 0,
    email: "",
    phone: 0,
  });
  function handleClick(e) {
    e.preventDefault()
    socket.emit('parthnerCreated', values);
  }
  function onHandleChange(event) {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
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
    <div className={`${styles.container}`}>
      <div className={`${styles.form_container}`}>
        <form action="">
          <h2 className={`${styles.form_heading}`}>Dodaj novog partnera</h2>

          <label>Naziv Partnera:</label>
          <input onChange={onHandleChange} type="text" name="name" />

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
          <input onChange={onHandleChange} type="email" name="email" />

          {/* Broj telefona */}
          <div className={`${styles.phone_input_container}`}>
            <label htmlFor="phoneNumber">Broj telefona:</label>
            <PhoneInput
              name="number"
              international
              placeholder="Unesite broj telefona"
              onChange={handlePhoneChange}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div className={`${styles.btns}`}>
            <button className={`${styles.btn} ${styles.btn1}`}>Otkazi</button>
            <button onClick={handleClick} className={`${styles.btn} ${styles.btn2}`}>
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
