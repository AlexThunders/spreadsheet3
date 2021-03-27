import React, {useContext,useState,useEffect} from 'react';
import { MainContext } from '../contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import ColsPortal from '../portals/ColsPortal';
import RowsPortal from '../portals/RowsPortal';

const Input = ({col}) => {
  const [inp,setInp] = useState('')
  const {saveHeadings,headings} = useContext(MainContext);

  const submitHeading = (e) => {
    if(e.keyCode === 13) {
      if(inp !== '') {
        saveHeadings(inp, col)
      }
    }
  }
  
  useEffect(() => {
    headings.map(heading => {
      if(heading.column === col) {
        setInp(heading.text);
      }
    })
  },[headings])

  const handleInput = (e) => {
    const inp = e.target.value;
    if(inp.length > 17) return;
    setInp(e.target.value);
  }

  return (
    <>
      <input 
        type="text"
        value={inp}
        onChange={handleInput}
        onKeyDown={submitHeading}
      />
    </>
  )
}




const Textarea = ({col,row,styleRow,styleCol}) => {
  const {saveDatas,datas} = useContext(MainContext);
  const [inp,setInp] = useState('');


  const submitTextareaInp = (e) => {
    if(e.keyCode === 13) {
      if(inp !== '') {
        saveDatas(col,row,inp);
      }
    }
  }
 
  
  useEffect(() => {
    datas.map(data => {
      if(data.column == col && data.row == row) {
        setInp(data.text);
      }
    })
  },[datas])

  return (
    <>
      <textarea 
        style={styleRow || styleCol}
        className="textArea"
        type="text"
        value={inp}
        onChange={e => setInp(e.target.value)}
        onKeyDown={submitTextareaInp}
      />
    </>
  )
}


function Table({sheet}) {
  const {cols,openColsPortal,openPortal4Cols,portalCol,openPortal4Rows,openRowsPortal,portalRow,reverse,reversed} = useContext(MainContext);

  const openRowsPort = (row) => {
    openRowsPortal(row);
  }
  const openColPort = (col) => {
    openColsPortal(col);
  }

  const handleRowStyle = (row) => {
    if(openPortal4Rows && row === portalRow) {
      return {backgroundColor: 'orange'};
    } 
  }
  const handleColStyle = (col) => {
    if(openPortal4Cols && col === portalCol) {
      return {backgroundColor: 'gold'};
    } 
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{fontSize: '13px',textAlign:'center',width:'30px'}} onClick={reverse}>
              <p className={reversed ? "rotatedN" : ""}>\/</p>
            </th>
            {cols.map(col => (
              <th key={uuidv4()} >
                {openPortal4Cols && ((col === portalCol) && <ColsPortal />)}
                <span className="insertCol" onClick={() => openColPort(col)}>
                  {cols.indexOf(col)+1}
                </span>
                <Input col={col}/>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sheet.rowsPerSheet.map(row => (
            <tr key={uuidv4()} style={handleRowStyle(row)}>
              <td style={handleRowStyle(row)} className="rowCounters" onClick={() => openRowsPort(row)}>
                {openPortal4Rows && ((row === portalRow) && <RowsPortal />)}{row}
              </td>
              {cols.map(col => (
                <td key={uuidv4()}
                  style={handleRowStyle(row) || handleColStyle(col)}>
                  <Textarea 
                    col={col}
                    row={row}
                    styleRow={handleRowStyle(row)}
                    styleCol={handleColStyle(col,row)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
