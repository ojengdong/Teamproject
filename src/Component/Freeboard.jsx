import React from 'react'
import { useState,useEffect } from 'react';
import './Freeboard.css';

const Freeboard = () => {
  const [vo, setVo] = useState({list: []});
   
       useEffect(() => {
         fetch('/api/list?p=1&s=10&b=10')
             .then(response => response.text())
             .then(message => {
              //console.log(JSON.stringify(message));
              //alert(typeof(JSON.parse(message)))
              let jsonData = JSON.parse(message);
              setVo(jsonData);

              const listItems = jsonData.list.map((v) =>{
                       console.log(v)
              });
             });
       },[])
  return (
    <div className='question'>
        <h1>게시판 목록보기</h1>
      <h2>{vo.pageInfo}</h2>
      <hr />
        <ol>
          { vo?.list?.map((item, index) => <li key={index}>{item.name}</li>) }
        </ol>
      <hr />
      <h2>{vo.pageList}</h2>
    </div>
  )
}

export default Freeboard