import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ onClose, data }) => {
  const [stockInfo, setStockInfo] = useState(null);
  useEffect(() => {
    const fetchStockInfo = async () => {
      if (data.finance !== null && data.finance !== "") {
        try {
          const response = await fetch(`/sp?index=${data.finance}`);
          const info = await response.json();
          setStockInfo(info);
        } catch (error) {
          console.error("Error fetching stock info:", error);
        }
      } else {
        // Set a specific message when finance is null
        setStockInfo({ message: "비상장 회사입니다" });
      }
    };

    fetchStockInfo();
  }, [data]);

  return (
    <div className="overlay">
      <div className="modal">
        <h2>{data.title}</h2>
        <strong className="adress">{data.adress}</strong> <br />
        <a href={data.homepage} target="_blank" rel="noopener noreferrer">
          홈페이지로 이동하기
        </a>
        <br />
        <div className="border"></div>
        {/* Display fetched stock info */}
        {stockInfo && (
          <div className="stocks">
            <h3>주가정보</h3>
            {/* Check if it's an unlisted company */}
            {stockInfo.message ? (
              <p>{stockInfo.message}</p>
            ) : (
              Object.entries(stockInfo).map(([name, price]) => (
                <p key={name}>
                  {name}: {price}
                </p>
              ))
            )}
          </div>
        )}
        <div className="BtnBox">
          <button className="closeBtn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
