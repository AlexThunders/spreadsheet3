import React,{useContext} from 'react';
import ReactDom from 'react-dom';
import { MainContext } from '../contexts/MainContext';


const portalBtn = {
  padding: '5px',
  backgroundColor: 'gold',
  borderRadius: '4px',
  width:'180px'
}

function ColsPortal() {
  const {portalCol,addColLeft,addColRight} = useContext(MainContext);

  const colPortal = {
    position: 'absolute',
    zIndex: 2,
    left:200 * portalCol - 100,
    top:180,
    display: 'flex',
    flexDirection: 'column'
  }
  return ReactDom.createPortal(
    <div style={colPortal}>
      <button style={portalBtn} onClick={addColLeft}>Add one to the Left of {portalCol}</button>
      <button style={portalBtn} onClick={addColRight}>Add one to the Right of {portalCol}</button>
    </div>,
    document.getElementById('colsPortal')
  )
}

export default ColsPortal
