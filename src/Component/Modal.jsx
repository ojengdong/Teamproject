import React from "react";
import { useState, useEffect } from "react";
const Modal = ({ onClose, data }) => {
  const [stockInfo, setStockInfo] = useState(null);
  useEffect(() => {
    const fetchStockInfo = async () => {
      if (data.finance !== null && data.finance !== "") {
        // Check if data.finance is defined and not empty
        try {
          const response = await fetch(`/sp?index=${data.finance}`); // Use the finance field as index
          const info = await response.json();
          setStockInfo(info);
        } catch (error) {
          console.error("Error fetching stock info:", error);
        }
      } else {
        // 주가정보가 없을경우
      }
    };

    fetchStockInfo();
  }, [data]);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{data.title}</h2>
        <strong>{data.adress}</strong> <br />
        <a href={data.homepage} target="_blank" rel="noopener noreferrer">
          홈페이지로 이동하기
        </a>
        <br />
        {/* Display fetched stock info */}
        {stockInfo && (
          <>
            <h3>주가정보</h3>
            {/* Assuming that your API returns an object where keys are names and values are prices */}
            {Object.entries(stockInfo).map(([name, price]) => (
              <p key={name}>
                {name}: {price}
              </p>
            ))}
          </>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    width: "400px",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default Modal;
