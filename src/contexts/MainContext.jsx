import React, { createContext, useState, useEffect } from 'react';

export const MainContext = createContext();

function MainContextProvider({children}) {
  const [cols,setCols] = useState(() => {
    const local = localStorage.getItem('cols');
    return local ? JSON.parse(local) : [];
  })
  const [numberOfInitCols,setNumberOfInitCols] = useState(() => cols.length);
  const [rows,setRows] = useState(() => {
    const local = localStorage.getItem('rows');
    return local ? JSON.parse(local) : [];
  })
  const [numberOfInitRows,setNumberOfInitRows] = useState(() => rows.length);
  const [rowsPerPage,setRowsPerPage] = useState(() => {
    const local = localStorage.getItem('rowsPerPage');
    return local ? JSON.parse(local) : '';
  })
  const [sheets,setSheets] = useState(() => {
    const local = localStorage.getItem('sheets');
    return local ? JSON.parse(local) : [];
  })
  const [headings,setHeadings] = useState(() => {
    const local = localStorage.getItem('headings');
    return local ? JSON.parse(local) : [];
  });
  const [datas,setDatas] = useState(() => {
    const local = localStorage.getItem('datas');
    return local ? JSON.parse(local) : [];
  });
  
  const [openPortal4Rows,setOpenPortal4Rows] = useState(false);
  const [portalRow,setPortalRow] = useState('');
  const [openPortal4Cols,setOpenPortal4Cols] = useState(false);
  const [portalCol,setPortalCol] = useState('');

  const [reversed,setReversed] = useState(false);

  const [openSearch4Col,setOpenSearch4Col] = useState(false);

  const [data4Search,setData4Search] = useState(() => {
    const local = localStorage.getItem('datas');
    return datas ? JSON.parse(local) : [];
  });


  // const [deletionOfRow,setDeletionOfRow] = useState(false);


  const saveCols = (inp) => {
    let arr = [];
    for(let c = 1; c <= inp; c++) {
      arr.push(c)
    }
    setCols(arr);
  }
  
  const saveRows = (inp) => {
    let arr = [];
    for(let r = 1; r <= inp; r++) {
      arr.push(r)
    }
    setRows(arr);
  }

  const saveRowsPerPage = (inp) => {
    setRowsPerPage(inp);
  }
  
  const createSheets = () => {
    let numberOfPages = Math.ceil(rows.length / rowsPerPage);
    let arr = [];
    for(let p = 1; p <= numberOfPages; p++) {
      let rowsInSheet = rows.splice(0,rowsPerPage);
      arr.push({page: p, rowsPerSheet: [...rowsInSheet]});
    }
    setSheets(arr);
  }
  
  useEffect(() => {
    localStorage.setItem('cols',JSON.stringify(cols));
  },[cols])
  
  useEffect(() => {
    localStorage.setItem('rows',JSON.stringify(rows));
    createSheets();
  },[rows])
  
  useEffect(() => {
    localStorage.setItem('rowsPerPage',JSON.stringify(rowsPerPage));
  },[rowsPerPage])
  
  useEffect(() => {
    localStorage.setItem('sheets',JSON.stringify(sheets));
  },[sheets])

  useEffect(() => {
    localStorage.setItem('headings',JSON.stringify(headings));
  },[headings])

  useEffect(() => {
    localStorage.setItem('datas',JSON.stringify(datas));
    localStorage.setItem('data4Search',JSON.stringify(data4Search));
  },[datas])

  const saveHeadings = (inp,col) => {
    setHeadings([...headings, {column: col, text: inp}]);
    headings.length > 0 && headings.map(head => {
      if(head.column === col) {
        let i = headings.indexOf(head);
        headings.splice(i,1,{column: col, text: inp})
        setHeadings([...headings]);
      }
    })
  }

  const saveDatas = (col,row,inp) => {
    setDatas([...datas,{column: col, row, text: inp}]);
    datas.length === 0 && window.location.reload();
    datas.length > 0 && (datas.map(data => {
      if(data.column === col && data.row === row) {
        let i = datas.indexOf(data);
        datas.splice(i,1,{column: col, row, text: inp});
        setDatas([...datas]);
        }
      })
    )
  }

  const search = (inp) => {
    if(inp.length > 0) {
      window.onbeforeunload = function() {
        return "after reload the amout of rows won't be saved";
      }
    }
    let arr = [];
    datas.map(data => {
      let length = inp.length;
      if(inp.slice(0) == data.text.slice(0,length)) {
        arr.push(data.row);
        setRows(arr);
      }
      if(inp === '') {
        saveRows(numberOfInitRows);
      }
    })
  }

  const openRowsPortal = (row) => {
    setOpenPortal4Rows(openPortal4Rows => !openPortal4Rows);
    setPortalRow(row);
  }
  
  
  const addRowAbove = () => {
    if(datas.length === 0) return;
    datas.map(data => {
      if(data.row >= portalRow) {
        data.row++;
      }
    })
    setDatas([...datas]);
    let arr = [];
    for(let r = 1; r <= numberOfInitRows + 1; r++) {
      arr.push(r);
    }
    setRows(arr);
    setNumberOfInitRows(numberOfInitRows + 1);
  }
  
  const addRowBelow = () => {
    if(datas.length === 0) return;
    let arr = [];
    datas.map(data => {
      if(data.row > portalRow) {
        data.row++;
      }
    })    
    setDatas([...datas]);
    for(let r = 1; r <= numberOfInitRows + 1; r++) {
      arr.push(r);
    }
    setRows(arr);
    setNumberOfInitRows(numberOfInitRows + 1)
  }
  
  const openColsPortal = (col) => {
    setOpenPortal4Cols(openPortal4Cols => !openPortal4Cols);
    setPortalCol(col);
  }

  const addColLeft = () => {
    if(datas.length === 0) return;
    datas.length > 0 && datas.map(data => {
      if(data.column >= portalCol) {
        data.column++;
      }
    })
    setDatas([...datas]);
    let arr = [];
    for(let c = 1; c <= numberOfInitCols + 1; c++) {
      arr.push(c);
    }
    setCols(arr);
    setNumberOfInitCols(numberOfInitCols + 1);
  }
  
  const addColRight = () => {
    if(datas.length === 0) return;
    datas.length > 0 && datas.map(data => {
      if(data.column > portalCol) {
        data.column++;
      }
    })
    setDatas([...datas]);
    let arr = [];
    for(let c = 1; c <= numberOfInitCols + 1; c++) {
      arr.push(c);
    }
    setCols(arr);
    setNumberOfInitCols(numberOfInitCols + 1);
  }

  const clear = () => {
    let check = window.confirm('Do you really want to clear all the data?');
    if(check) {
      datas.length > 0 && datas.map(data => {
        data.text = '';
      })
      setDatas([...datas]);
      createSheets();
      window.location.reload();
    }
  }

  const deleteTable = () => {
    let check = window.confirm('Do you really want to delete the spreadsheet?');
    if(check) {
      setRows([]);
      setCols([]);
      setDatas([]);
      setSheets([]);
      setHeadings([]);
      setRowsPerPage('');
    }
  } 
  
  const deleteRow = () => {
    //delete data for row like portalRow
    let arr = datas.filter(data => data.row !== portalRow);
    setDatas([...arr]);
    // setDeletionOfRow(true);
    //make new count of rows
    let rowsArr = JSON.parse(localStorage.getItem('rows'));
    let newArr = rowsArr.filter(row => row !== portalRow);
    let reducedRows = [];
    let length = newArr.length;
    for(let r = 1; r <= length; r++) {
      reducedRows.push(r);
    }
    setRows(reducedRows);
    //unshift all rows with data which go after portalRow
    // if(deletionOfRow) {
      datas.map(data => {
        if(data.row > portalRow) {
          data.row--;
        }
      })
      setDatas([...datas]);
    // }
  }

  const reverse = () => {
    const allRows = JSON.parse(localStorage.getItem('rows'));
    allRows.reverse();
    setRows(allRows);
    setReversed(reversed => !reversed);
  }

  const openColSearch = (col) => {
    setOpenSearch4Col(true);
    setPortalCol(col);
  }
  
  const closeColSearch = (col) => {
    setPortalCol(col);
    setOpenSearch4Col(false);
  }

  const searchColumn = (col,inp) => {
    let arr = [];
    data4Search.map(data => {
      let length = inp.length;
      if(inp.slice(0).toLowerCase() === data.text.slice(0,length).toLowerCase() && col === data.column) {
        arr.push(data.row);
        setRows(arr);
        for(let r = 0; r < arr.length; r++) {
          if(arr[r] === data.row) {
            setData4Search([...data4Search, {column:col, row: r, text: data.text}])
            console.log(data4Search)
          }
        }
      }
      if(inp === '') {
        saveRows(numberOfInitRows);
      }
    })
  }


  return (
    <div>
      <MainContext.Provider value={{
        cols,
        sheets,
        headings,
        datas,
        openPortal4Rows,
        openPortal4Cols,
        portalRow,
        portalCol,
        reversed,
        openSearch4Col,
        saveCols,
        saveRows,
        saveRowsPerPage,
        saveHeadings,
        saveDatas,
        search,
        openRowsPortal,
        addRowAbove,
        addRowBelow,
        openColsPortal,
        addColLeft,
        addColRight,
        clear,
        deleteTable,
        deleteRow,
        reverse,
        searchColumn,
        openColSearch,
        closeColSearch
      }}>
        {children}
      </MainContext.Provider>
    </div>
  )
}

export default MainContextProvider;
