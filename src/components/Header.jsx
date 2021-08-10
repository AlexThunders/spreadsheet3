import React, { useContext, useLayoutEffect, useState } from 'react'
import { MainContext } from '../contexts/MainContext'

function Header() {
  const {cols} = useContext(MainContext);
  const [head,setHead] = useState('');
  const [tableWidth,setTableWidth] = useState('');
  const [newWidth,setNewWidth] = useState('');

  useLayoutEffect(() => {
    let table = document.querySelector('.table');
    if(table) {
    setNewWidth(Math.floor(table.getBoundingClientRect().width) + 320);
    }
    setHead(<div style={{width: newWidth}} className="header"><h2>spreadsheet</h2></div>)
  },[cols]);

  return (
    <>
      {head}
    </>
  )
}

export default Header
