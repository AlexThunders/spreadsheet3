import React,{useContext} from 'react';
import ReactDom from 'react-dom';
import { MainContext } from '../contexts/MainContext';


const portalBtn = {
  padding: '5px',
  backgroundColor: 'orange',
  borderRadius: '3px'
}

function RowsPortal() {
  const {portalRow,addRowAbove,addRowBelow,deleteRow} = useContext(MainContext);
  
  const rowPortal = {
    position: 'absolute',
    top: '28%',
    left: 50,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
  return ReactDom.createPortal(
    <div style={rowPortal}>
      <button style={portalBtn} onClick={deleteRow}>Delete row {portalRow}</button>
      <button style={portalBtn} onClick={addRowAbove}>Add one above {portalRow}</button>
      <button style={portalBtn} onClick={addRowBelow}>Add one below {portalRow}</button>
    </div>,
    document.getElementById('rowsPortal')
    )
  }
  
  export default RowsPortal
  