// LayoutComponent.js
import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent';

function LayoutComponent() {
  const [rows, setRows] = useState([]);

  const orderRows = data => {
    setRows(prevRows => {
      const items = data.map((row, index) => ({ ...row, pos: index }));
      return items;
    });
  };
  // const orderRows = data => {
  //   const items = data.map((row, index) => ({ ...row, pos: index }));
  //   setRows(items);
  // };
  useEffect(() => {
    fetch('http://localhost:4001/userRows')
      .then(response => response.json())
      .then(data => orderRows(data));
  }, []);


  const handleRowDragStart = (e, rowPos) => {
    console.log('handleRowDragStart rowPos:', rowPos); // Add this line

    e.dataTransfer.setData('text/plain', rowPos);
  };

  const handleRowDragOver = (e) => {
    e.preventDefault();
  };

  // const handleRowDrop = (e, targetRowPos) => {
  //   e.preventDefault();
  //   const draggedRowPos = parseInt(e.dataTransfer.getData('text/plain'), 10);

  //   if (draggedRowPos !== targetRowPos) {
  //     const updatedRows = [...rows];
  //     const draggedRow = updatedRows[draggedRowPos];
  //     updatedRows.splice(draggedRowPos, 1);
  //     updatedRows.splice(targetRowPos, 0, draggedRow);

  //     setRows(updatedRows.map((row, index) => ({ ...row, pos: index })));
  //   }
  // };

  const handleItemDragStart = (e, rowPos, itemIndex) => {
    e.stopPropagation(); // Stop event propagation to prevent row drag
    e.dataTransfer.setData('text/plain', JSON.stringify({ rowPos, itemIndex }));
  };

  const handleItemDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemDrop = (e, targetRowPos, targetItemIndex) => {
    e.preventDefault();
    console.log("handleItemDrop called");
    const { rowPos, itemIndex } = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (rowPos === targetRowPos && itemIndex !== targetItemIndex) {
      console.log("Item moved within the same row");
      const updatedRows = [...rows];
      const targetRow = updatedRows[rowPos];
      const draggedItem = targetRow.items[itemIndex];

      // Remove item from original position
      targetRow.items.splice(itemIndex, 1);

      // Insert item at new position
      targetRow.items.splice(targetItemIndex, 0, draggedItem);

      setRows(updatedRows);
      console.log('updated rows', rows);
      e.stopPropagation();
    }
  };

  const handleRowDrop = (e, targetRowPos) => {
    e.preventDefault();
    console.log('handleRowDrop called');

    const draggedRowPos = parseInt(e.dataTransfer.getData('text/plain'), 10);
    console.log('draggedRowPos:', draggedRowPos, 'targetRowPos:', targetRowPos); // Add this line

    if (draggedRowPos !== targetRowPos) {
      console.log("Row moved to a different position");
      const updatedRows = [...rows];
      const draggedRow = updatedRows[draggedRowPos];
      updatedRows.splice(draggedRowPos, 1);
      updatedRows.splice(targetRowPos, 0, draggedRow);

      setRows(updatedRows.map((row, index) => ({ ...row, pos: index })));
    }
  };

  return (
    <ListComponent
      rows={rows}
      onRowDragStart={handleRowDragStart}
      onRowDragOver={handleRowDragOver}
      onRowDrop={handleRowDrop}
      onItemDragStart={handleItemDragStart}
      onItemDragOver={handleItemDragOver}
      onItemDrop={handleItemDrop}
    />
  );
}

export default LayoutComponent;