import React from 'react';
import ListRowComponent from './ListRowComponent';

function ListComponent({
  rows,
  onRowDragStart,
  onRowDragOver,
  onRowDrop,
  onItemDragStart,
  onItemDragOver,
  onItemDrop,
  swapRows
}) {
  return (
    <div>
      {rows.map((row) => (
        <ListRowComponent
          key={`${row.id}-${row.pos}`}
          row={row}
          onRowDragStart={onRowDragStart}
          onRowDragOver={onRowDragOver}
          onRowDrop={onRowDrop}
          onItemDragStart={onItemDragStart}
          onItemDragOver={onItemDragOver}
          onItemDrop={onItemDrop}
          swapRows={swapRows}
        />
      ))}
    </div>
  );
}

export default ListComponent;