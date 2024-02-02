import React, { useEffect, useState } from "react";
import styles from '../assets/css/table.module.css'
import { socket } from "../socket/Socket";
const Table = () => {
  const [search, setSearch] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [data, setData] = useState([])
  const [lstatus, setLicenseStatus] = useState("")
  useEffect(() => {
    socket.emit('fetchData')
    socket.on('fetchedData', datas => {
      setData(datas)
    })
  }, [])

  useEffect(() => {
    const filteredResults = data.filter(
      (el) =>
        el.distributor.toLowerCase().includes(search.toLowerCase()) ||
        el.partner_name.toLowerCase().includes(search.toLowerCase()) ||
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.pib.toString().includes(search.toLowerCase()) ||
        el.jid.toLowerCase().includes(search.toLowerCase()) ||
        el.license_status.toLowerCase().includes(search.toLowerCase()) ||
        el.date_created.toLowerCase().includes(search.toLowerCase()) ||
        el.env.toLowerCase().includes(search.toLowerCase()) ||
        el.istorijat.toLowerCase().includes(search.toLowerCase()) ||
        el.arc.toLowerCase().includes(search.toLowerCase()) ||
        el.date_expiried.toLowerCase().includes(search.toLowerCase())
    );
    setCurrentPage(1);
    setFilteredData(filteredResults);
  }, [search, data]);

  function removeSearch() {
    setSearch("");
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const handleLicenseStatus = (e) => {
    if(e.target.checked) {
      setLicenseStatus("")
    }
    setLicenseStatus(e.target.name)
    console.log(lstatus)
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.left_list}>
          <div className={styles.status}>
            <h2>Status licence</h2>
            <div className={styles.checkboxes}>
              <input className="box1" name="aktivna" type="checkbox" onChange={handleLicenseStatus}></input>
              <label htmlFor="aktivna">Aktivna</label>
              <input className="box1" name="istice" type="checkbox" onChange={handleLicenseStatus}></input>
              <label htmlFor="istice">Ističe uskoro</label>
              <input className="box1" name="istekla" type="checkbox" onChange={handleLicenseStatus}></input>
              <label htmlFor="istekla">Istekla</label>
            </div>
          </div>
          <div className={styles.search_div}>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              className={styles.search}
              placeholder="Pretrazi..."
            ></input>

            { }
            <button className={styles.clear_search} onClick={removeSearch}>X</button>
          </div>
        </ul>
        <ul className={styles.right_list}>
          <button className={styles.btn}>Prenesi licencu</button>
          <button className={styles.btn}>Produži licencu</button>
          <button className={styles.btn}>Poništi licencu</button>
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Distributer</th>
            <th>Partner</th>
            <th>Klijent</th>
            <th>Pib</th>
            <th>Jid</th>
            <th>Status licence</th>
            <th>Datum izdavanja</th>
            <th>Datum isteka</th>
            <th>Env</th>
            <th className="istorijat">Istorijat</th>
            <th className="arc">ARC</th>
            <th className="box">
              <input type="checkbox" disabled></input>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((el, index) => (
            <tr key={index}>
              <td data-label="Distributer">{el.distributor}</td>
              <td data-label="Partner">{el.partner_name}</td>
              <td data-label="Klijent">{el.name}</td>
              <td data-label="Pib">{el.pib}</td>
              <td data-label="Jid">{el.jid}</td>
              {el.license_status === "aktivna" ? (
                <td data-label="Status licence" style={{ color: "green" }}>
                  {el.license_status}
                </td>
              ) : el.license_status === "istice uskoro" ? (
                <td data-label="Status licence" style={{ color: "orange" }}>
                  {el.license_status}
                </td>
              ) : el.license_status === "istekla" ? (
                <td data-label="Status licence" style={{ color: "red" }}>
                  {el.license_status}
                </td>
              ) : (
                <td data-label="Status licence">
                  {el.license_status}
                </td>
              )}
              <td data-label="Datum izdavanja">{el.date_created}</td>
              <td data-label="Datum isteka">{el.date_expiried}</td>
              {/*  */}
              <td data-label="Env">{el.env}</td>
              <td data-label="Istorijat">{el.istorijat}</td>
              <td data-label="Arc">{el.arc}</td>
              <td className="box">
                <input type="checkbox" disabled></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Prikazi stranice */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.btn} ${styles.pagebtn}`}
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage == 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${styles.btn} ${styles.pagebtn}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`${styles.btn} ${styles.pagebtn}`}
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage == totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
