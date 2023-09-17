import React, { useState, useEffect } from "react";
import "./App.css";
import { Router, Route, Routes } from "react-router-dom";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import Modal from "./Component/Modal";
// import KakaoApi from "./api/MapContainer";
// import Map from "./api/Map copy"

const { kakao } = window;
function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((response) => response.text())
  //     .then((message) => {
  //       setMessage(message);
  //     });
  // }, []);

  const [activemodal, setActiveModal] = useState(null); // 현재 활성화된 모달
  const [activeMarker, setActiveMarker] = useState(null); // 현재 활성화 된 인포윈도우
  const locations = [
    {
      title: "에스케이하이닉스(주)",
      latlng: { lat: 37.252116, lng: 127.4866466 },
    },
    { title: "서울반도체(주)", latlng: { lat: 37.3166047, lng: 126.7858521 } },
    {
      title: "온세미컨덕터코리아(주)",
      latlng: { lat: 37.5126179, lng: 126.7861585 },
    },
    { 
      title: "엘비세미콘(주)", 
      latlng: { lat: 37.0554799, lng: 126.9737088 } 
    },
    { 
      title: "에이치디현대에너지솔루션(주)", 
      latlng: { lat: 37.3767129, lng: 127.104857} 
    },
  ];

  return (
    <Map
      center={{ lat: 36.3504119, lng: 127.3845475 }}
      style={{ width: "1000px", height: "800px" }}
      level={10}
    >
      {locations.map((loc, idx) => (
        <MapMarker
          key={`${loc.title}-${loc.latlng}`}
          position={loc.latlng}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: { width: 24, height: 35 },
          }}
          title={loc.title}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onClick={() => {
            setActiveModal(idx);
            setActiveMarker(idx);
          }}
        >
          {/* 선택된 마커에 대해서만 인포윈도우 표시 */}
          {activeMarker && (
            <div style={{ minWidth: "150px" }}>
              <img
                alt="close"
                width="14"
                height="13"
                src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveMarker(null)}
              />
              <div style={{ padding: "5px", color: "#000" }}>{loc.title}</div>
            </div>
          )}
        </MapMarker>
      ))}

      {activemodal !== null && (
        <Modal
          onClose={() => setActiveModal(null)}
          data={locations[activemodal]}
        />
      )}
    </Map>
  );
}

export default App;
