import React, {useState,useContext,useRef} from 'react';
import {MainContext} from '../contexts/MainContext';

function Dashboard() {
  const {saveCols,saveRows,saveRowsPerPage,clear,deleteTable} = useContext(MainContext);
  const [colsInp, setColsInp] = useState('');
  const [rowsInp, setRowsInp] = useState('');
  const [rowsPerPageInp, setRowsPerPageInp] = useState('');
  const [open,setOpen] = useState(false);
  const colsRef = useRef();
  const rowsRef = useRef();
  const rowsPerPagesRef = useRef();

  const handleColsChange = (e) => {
    let value = e.target.value;
    if(isNaN(value) || value > 50) return;
    setColsInp(e.target.value);
  }
  const handleRowsChange = (e) => {
    let value = e.target.value;
    if(isNaN(value) || value > 500) return;
    setRowsInp(e.target.value);
  }
  const handleRowsPerPageChange = (e) => {
    let value = e.target.value;
    if(isNaN(value) || value > 100) return;
    setRowsPerPageInp(e.target.value);
  } 
  
  const submitCols  = (e) => {
    if(e.keyCode === 13) {
      if(colsInp !== '') {
        saveCols(colsInp);
        rowsRef.current.focus();
      }
    }
  }
  const submitRows  = (e) => {
    if(e.keyCode === 13) {
      if(colsInp === '' && rowsInp !== '') {
        colsRef.current.focus();
      }
      if(rowsInp !== '') {
        rowsPerPagesRef.current.focus();
      }
    }
  }
  const submitRowsPerPage  = (e) => {
    if(e.keyCode === 13) {
      if(colsInp !== '' && rowsInp !== '' && rowsPerPageInp !== '') {
        saveRowsPerPage(rowsPerPageInp);
        saveRows(rowsInp);
        setOpen(false);
      } 
      else {
        alert('To create a spreadsheet, fill all the inputs');
      }
    }
  }

  return (
    <div className="dashBoard">
      {open ? 
        <>
        <div>
          <lable is="3dx">Columns:</lable>
          <input 
            ref={colsRef}
            type="text"
            value={colsInp}
            onChange={handleColsChange}
            onKeyDown={submitCols}
          />
          <lable is="3dx">Rows:</lable>
          <input 
            ref={rowsRef}
            type="text"
            value={rowsInp}
            onChange={handleRowsChange}
            onKeyDown={submitRows}
          />
          <lable is="3dx">Rows per page:</lable>
          <input 
            ref={rowsPerPagesRef}
            type="text"
            value={rowsPerPageInp}
            onChange={handleRowsPerPageChange}
            onKeyDown={submitRowsPerPage}
          />
        </div>
        <div className="clearAndDel">
          <button onClick={clear}>Clear all data</button>
          <button onClick={deleteTable}>Delete spreadsheet</button>
        </div>
        <span className="closeDashBoard" onClick={() => setOpen(false)}>x</span>
      </>
      : 
        <div className="openDashBoard" onClick={() => setOpen(true)}><span>Open dashboard</span></div> 
      }
    </div>
  )
}

export default Dashboard
