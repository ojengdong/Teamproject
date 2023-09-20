import "./Freeboard.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Freeboard = () => {
  const [data, setData] = useState({ list: [], pageInfo: "", pageList2: "" });
  const [vo, setVo] = useState("");

  useEffect(() => {
    fetch("/board/list?p=1&s=10&b=10")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      });
  }, []);

  return (
    <div className="question">
      <h1>게시판 목록보기</h1>
      <hr />

      <h2 className="Info">{data.pageInfo}</h2>
      
      {data?.list?.length > 0 && (
        <table className="tableBox">
          <tbody>
            <tr>
              <th>번호</th>
              <th>작성자</th>
              <th style={{ width: "60%" }}>제목</th>
              <th>작성일</th>
            </tr>

            {data.list.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td className="subject">
                  <Link to={`/view/${item.id}`}>{item.subject}</Link>
                  <span>{vo.commentCount}</span>
                </td>
                <td>
                  {(() => {
                    const date = new Date(item.regDate);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();

                    // 각 값이 한 자리수일 경우 앞에 '0'을 붙여줍니다.

                    return `${month.toString().padStart(2, "0")}-${day
                      .toString()
                      .padStart(2, "0")} ${hours
                      .toString()
                      .padStart(2, "0")}:${minutes
                      .toString()
                      .padStart(2, "0")}`;
                  })()}
                  <tr key={index}>{/* Render table cells */}</tr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Freeboard;
