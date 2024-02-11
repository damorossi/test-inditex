// LayoutComponent.js
import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent';

function LayoutComponent() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4001/userRows')
      .then(response => response.json())
      .then(data => setRows(data.map((row, index) => ({ ...row, pos: index }))));
  }, []);

  const handleRowDragStart = (e, rowPos) => {
    e.dataTransfer.setData('text/plain', rowPos);
  };

  const handleRowDragOver = (e) => {
    e.preventDefault();
  };

  const handleRowDrop = (e, targetRowPos) => {
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

  const handleItemDragStart = (e, itemId, rowPos, itemIndex) => {
    e.stopPropagation(); // Stop event propagation to prevent row drag
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemId, rowPos, itemIndex }));
  };


  const handleItemDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemDrop = (e, targetRowPos, targetItemIndex) => {
    e.preventDefault();
    const { itemId, rowPos, itemIndex } = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (rowPos === targetRowPos && itemIndex !== targetItemIndex) {
      const updatedRows = [...rows];
      const targetRow = updatedRows[targetRowPos];
      const draggedItem = targetRow.items[itemIndex];

      // Remove item from original position
      targetRow.items.splice(itemIndex, 1);

      // Insert item at new position
      targetRow.items.splice(targetItemIndex, 0, draggedItem);

      setRows(updatedRows);
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