import React,{Fragment, useContext} from 'react';
import ReactDom from 'react-dom';
import { MainContext } from '../contexts/MainContext';

const colPortal = {
  position: 'absolute',
  top: '50%',
  left: '70%',
  zIndex: 2,
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column'
}

const portalBtn = {
  padding: '5px',
  backgroundColor: 'gold'
}

function ColsPortal() {
  const {portalCol,addColLeft,addColRight} = useContext(MainContext);
  return ReactDom.createPortal(
    <div style={colPortal}>
      <button style={portalBtn} onClick={addColLeft}>Add one to the Left of {portalCol}</button>
      <button style={portalBtn} onClick={addColRight}>Add one to the Right of {portalCol}</button>
    </div>,
    document.getElementById('colsPortal')
  )
}

export default ColsPortal
