import React,{useContext} from 'react';
import ReactDom from 'react-dom';
import { MainContext } from '../contexts/MainContext';

const rowPortal = {
  position: 'absolute',
  top: '50%',
  left: '30%',
  zIndex: 1,
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column'
}

const portalBtn = {
  padding: '5px',
  backgroundColor: 'orange'
}

function RowsPortal() {
  const {portalRow,addRowAbove,addRowBelow,deleteRow} = useContext(MainContext);

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
