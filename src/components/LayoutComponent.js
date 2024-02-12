// LayoutComponent.js
import React, { useState, useEffect } from 'react';
import ListRowComponent from './ListRowComponent';
import './layout.scss';

function LayoutComponent() {
  const [rows, setRows] = useState([]);
  const [selectedRowItem, setRowItem] = useState(-1);
  const [position, setPosition] = useState('flex-end');

  useEffect(() => {
    fetch('http://localhost:4001/userRows')
      .then(response => response.json())
      .then(data => setRows(data));
  }, []);

  const handleRowDragStart = (e, rowPos) => {
    console.log('handleRowDragStart rowPos:', rowPos); // Add this line
    e.dataTransfer.setData('text/plain', rowPos);
  };

  const handleRowDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemDragStart = (e, rowPos, itemIndex) => {
    setRowItem(itemIndex);
    e.stopPropagation(); // Stop event propagation to prevent row drag
    e.dataTransfer.setData('text/plain', JSON.stringify({ rowPos, itemIndex }));
  };

  const handleItemDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleItemDrop = (e, targetRowPos, targetItemIndex) => {
    if (selectedRowItem < 0) {
      return;
    }
    e.preventDefault();

    const { rowPos, itemIndex } = JSON.parse(e.dataTransfer.getData('text/plain'));

    const updatedRows = [...rows];

    if (rowPos === targetRowPos) { // if item is in same row
      const targetRow = updatedRows[rowPos];
      const draggedItem = targetRow.items.splice(itemIndex, 1)[0]; // Combine removal and retrieval
      targetRow.items.splice(targetItemIndex, 0, draggedItem);
    } else { // Item moved to a different row
      const originalRow = updatedRows[rowPos];
      const targetRow = updatedRows[targetRowPos];
      if (targetRow.items.length >= 3) {
        return;
      }
      targetRow.items.splice(targetItemIndex, 0, originalRow.items.splice(itemIndex, 1)[0]);
    }
    setRows(updatedRows);
    setRowItem(-1);
  };

  const handleRowDrop = (e, targetRowPos) => {
    if (selectedRowItem >= 0) {
      handleItemDrop(e, targetRowPos, selectedRowItem);
      return;
    }
    e.preventDefault();

    const draggedRowPos = parseInt(e.dataTransfer.getData('text/plain'), 10);

    if (draggedRowPos !== targetRowPos) {
      const updatedRows = [...rows];
      const draggedRow = updatedRows[draggedRowPos];
      updatedRows.splice(draggedRowPos, 1);
      updatedRows.splice(targetRowPos, 0, draggedRow);

      setRows(updatedRows.map((row, index) => ({ ...row, pos: index })));
    }
  };

  const handleAlignment = (pos, rowId) => {
    let rowData = [...rows];
    rowData = rowData.map(x => {
      if (rowId === undefined) {
        x.align = pos;
      } else if (rowId === x.id) {
        x.align = pos
      }
      return x;
    });

    setRows(rowData);
  };


  return (
    <div className="main">
      {/* <div className="control-container">
        <div className="control-aligners">
          <button type="button" id="flex-start" onClick={handleAlignment}>|-</button>
          <button type="button" id="center" onClick={handleAlignment}>-|-</button>
          <button type="button" id="flex-end" onClick={handleAlignment}>-|</button>
        </div>
      </div> */}
      {
        rows.map((row) => (
          <ListRowComponent
            key={`${row.id}-${row.pos}`}
            row={row}
            onRowDragStart={handleRowDragStart}
            onRowDragOver={handleRowDragOver}
            onRowDrop={handleRowDrop}
            onItemDragStart={handleItemDragStart}
            onItemDragOver={handleItemDragOver}
            onItemDrop={handleItemDrop}
            position={position}
            onHandleAlignment={handleAlignment}
          />
        ))
      }
    </div>
  );
}

export default LayoutComponent;
