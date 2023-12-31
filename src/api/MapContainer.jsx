import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./MapContainer.css";
import MainImg from "../images/반도체.jpg";
import logo from "../images/logo.png";
import instagram from "../images/인스타그램.png";
import facebook from "../images/페이스북.png";
import youtube from "../images/유튜브.png";
import Modal from "../Component/Modal";
import Freeboard from "../Component/Freeboard";
import Register from "../pages/LoginRegister/Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;
const MapContainer = ({ searchPlace }) => {
  const [activemodal, setActiveModal] = useState(null); // 현재 활성화된 모달
  const [activeMarker, setActiveMarker] = useState(null); // 현재 활성화 된 인포윈도우
  const locations = [
    {
      title: "에스케이하이닉스(주)",
      adress: "경기도 이천시 부발읍 경충대로 2091",
      homepage: "https://www.skhynix.com/",
      finance: 1,
      latlng: { lat: 37.252116, lng: 127.4866466 },
    },

    {
      title: "서울반도체(주)",
      adress: "경기도 안산시 단원구 산단로 163번길 97-11",
      homepage: "http://www.seoulsemicon.com/kr",
      finance: 2,
      latlng: { lat: 37.3166047, lng: 126.7858521 },
    },

    {
      title: "온세미컨덕터코리아(주)",
      adress: "경기도 부천시 평천로 850번길 55",
      homepage: "",
      finance: null,
      latlng: { lat: 37.5126179, lng: 126.7861585 },
    },

    {
      title: "엘비세미콘(주)",
      adress: "경기도 평택시 청북읍 청북산단로 138",
      homepage: "https://www.onsemi.com",
      finance: null,
      latlng: { lat: 37.0554799, lng: 126.9737088 },
    },

    {
      title: "ISC 본사",
      adress: "경기 성남시 수정구 금토로40번길 26",
      homepage: "https://kor.isc21.kr/",
      finance: 10,
      latlng: { lat: 37.005703, lng: 127.189895 },
    },

    {
      title: "한양이엔지본사",
      adress: "경기 화성시 영통로 26번길 72",
      homepage: "https://www.hanyangeng.co.kr/",
      finance: 9,
      latlng: { lat: 37.231845, lng: 127.069003 },
    },

    {
      title: "서플러스 글로벌",
      adress: "경기 용인시 처인구 남사읍 서촌로 56",
      homepage: "https://www.surplusglobal.com/",
      finance: 11,
      latlng: { lat: 37.1387, lng: 127.130189 },
    },

    {
      title: "주성엔지니어링 본사",
      adress: "경기 광주시 오포로 240",
      homepage: "https://www.jusung.com/",
      finance: 12,
      latlng: { lat: 37.348939, lng: 127.1187732 },
    },

    {
      title: "프로텍",
      adress: "경기 경기 안양시 동안구 시민대로327번길 11-14",
      homepage: "http://www.protec21.co.kr/",
      finance: 13,
      latlng: { lat: 37.398484, lng: 126.965137 },
    },
  ];

  return (
    <div className="wrapper">
      <header className="global-header">
        <div className="imgBox">
          <img className="mainImg" src={MainImg} alt="메인 이미지" />
        </div>
        <div className="gnb">
          <div className="gnb-logoBox">
            <h1>
              <img className="gnb-logo" src={logo} alt="로고" />
            </h1>
          </div>

          <div className="gnb-menuBox">
            <div className="menu">
              <ul className="menuItem">
                <Link>
                  <li className="menuList">공지사항</li>
                </Link>

                <Link to="/Freeboard">
                  <li className="menuList">문의하기</li>
                </Link>

                <Link>
                  <li className="menuList">이력서</li>
                </Link>
              </ul>
            </div>
            <div className="BtnBox">
              <Link to="/login">
                <button className="loginBtn" type="button">
                  로그인
                </button>
              </Link>
              <Link to="/Register">
                <button className="joinBtn" type="button">
                  회원가입
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="imgTxtBox">
          <div className="searchBox">
            <form
              className="searchForm"
              action="https://www.google.com/search"
              target="_blank"
              method="GET"
            >
              <input
                name="q"
                type="text"
                placeholder="검색하시면 Goggle페이지로 이동합니다."
                size="100"
              />
              <FontAwesomeIcon
                className="searchIcon"
                icon={faMagnifyingGlass}
              />
            </form>
          </div>

          <div className="imgTxt">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <h1>ABOUT US</h1>
          </div>
        </div>
      </header>

      <div className="map">
        <div className="place">
          <div className="placeItem">
            <p className="iconBox">
              <FontAwesomeIcon className="icon" icon={faSquare} />
            </p>
            <h1>회사 위치</h1>
          </div>
        </div>
        <Map
          className="map-item"
          center={{ lat: 36.3504119, lng: 127.3845475 }}
          level={12}
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
              adress={loc.adress}
              homepage={loc.homepage}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
              onClick={() => {
                setActiveModal(idx);
                setActiveMarker(idx);
              }}
            >
              {/* 선택된 마커에 대해서만 인포윈도우 표시 */}
              {activeMarker && (
                <div className="marker">
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    onClick={() => setActiveMarker(null)}
                  />
                  <div className="Marker-Title">{loc.title}</div>
                </div>
              )}
            </MapMarker>
          ))}

          {/* 모달컴포넌트 랜더링 */}
          {activemodal !== null && (
            <Modal
              onClose={() => setActiveModal(null)}
              data={locations[activemodal]}
            />
          )}
        </Map>
      </div>

      <footer>
        <div className="footer-wrap">
          <div className="footerTop">
            <ul className="footerTop-list">
              <li className="footerTop-item1">개인정보처리</li>
              <li className="footerTop-item">영상정보처리기기운영관리방침</li>
              <li className="footerTop-item">저작권정책</li>
              <li className="footerTop-item">이메일무단수집거부</li>
              <li className="footerTop-item">관련사이트</li>
              <li className="footerTop-item">뷰어다운로드</li>
            </ul>
          </div>
          <div className="footerUnder">
            <div className="footerLogo-Txt">
              <div className="footerLogo">
                <img src={logo} alt="" />
              </div>

              <div className="footerTxtBox">
                <span>
                  (우)34838 대전 중앙로 121번길 20 전화: 042-000-0000 팩스:
                  042-111-1111
                  <br />
                  <br />본 홈페이지는 게시된 이메일 주소가 자동 수집되는 것을
                  거부하며 이를 위반시 정보통신망법에 의해 처벌됨을 유념하여
                  주시기 바랍니다.
                </span>
              </div>
            </div>

            <div className="footerBtnBox">
              <div className="trafficBtn">
                <a href="https://www.utic.go.kr/main/main.do" target="_blank">
                  <button type="button">현재 교통상황보기</button>
                </a>
              </div>

              <div className="mapSite">
                <a href="https://map.kakao.com/" target="_blank">
                  <button type="button">카카오 지도열기</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MapContainer;
