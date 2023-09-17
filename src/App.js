import React, { useState, useEffect } from "react";
import "./App.css";
import { Router, Route, Routes } from "react-router-dom";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import Modal from "./Component/Modal";
import MapContainer from "./api/MapContainer"
import Login from "./pages/Login/Login"
import Register from "./pages/LoginRegister/Register"
import Join from "./pages/LoginJoin/Join"

const { kakao } = window;

function App() {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);


  return (
    <div>
      <Routes>
        <Route path="/" element={<MapContainer />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>} />
        <Route path="/Join" element={<Join/>} />
      </Routes>
    </div>
  );


}

export default App;