import React, {useContext, useState, useEffect} from 'react';
import { MainContext } from '../contexts/MainContext';
import Table from './Table';
import {v4 as uuidv4} from 'uuid';



const Search = ({return2page1}) => {
  const {search} = useContext(MainContext);
  const [searchInp,setSearchInp] = useState('');

  useEffect(() => {
    return2page1();
    search(searchInp);
  },[searchInp])

  return (
    <div className="search">
      <lable is="3dx">search:</lable>
      <input 
        type="text"
        value={searchInp}
        onChange={e => setSearchInp(e.target.value)}
      />
    </div>
  )
}



function Home() {
  const {sheets} = useContext(MainContext);
  const [page,setPage] = useState(1)

  const increment = () => {
    let length = sheets.length;
    if(page == length) return;
    setPage(page => Number(page) + 1);
  }
  const decrement = () => {
    if(page == 1) return;
    setPage(page => Number(page) - 1);
  }

  const return2page1 = () => {
    setPage(1);
  }
  
  return (
    <div> 
      <div className="selectBtns">
        {sheets.length > 0 && (
          <div>
            <span className="leftArrow" onClick={decrement}><i className="fas fa-arrow-alt-circle-left"></i></span>
            <span className="pageIndicator">Page 
              <select className="select" value={page} onChange={e => setPage(e.target.value)}>
                {sheets.map(sheet => (
                  <option key={uuidv4()}>{sheet.page}</option>
                ))}
              </select>
            </span>
            <span className="rightArrow" onClick={increment}><i className="fas fa-arrow-alt-circle-right"></i></span>
          </div>
        )}
      </div>
      {sheets.length > 0 && <Search return2page1={return2page1}/>}
      {sheets.length > 0 && sheets.map(sheet => {
        if(sheet.page == page) {
          return <Table key={uuidv4()} sheet={sheet} />
        }
      })}
    </div>
  )
}

export default Home
