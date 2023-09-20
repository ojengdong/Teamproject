import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const [data, setData] = useState({});
  const [vo, setVO] = useState({});
  const { id } = useParams(); // URL 파라미터에서 id 값 가져오기

  useEffect(() => {
    fetch(`/view/${id}`, {
      method: "GET", // Use GET instead of POST
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      });
  }, [id]);

  if (!data.vo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 mb-5 text-center bg-light">
      <h2 className="mb-3">나의 자유게시판 - 내용보기</h2>

      <div className="container">
        {/* 여기서 data (서버에서 받아온 데이터)를 사용하여 필요한 정보 출력 */}

        {/* 예: */}

        <p>{data.vo.subject}</p>
        <p>작성자: {data.vo.name}</p>
        <p>내용: {data.vo.content}</p>

        {/* ... */}
      </div>
      <div>${vo.subject}</div>
      <div>[[${vo.content}]]</div>
    </div>
  );
};

export default View;
