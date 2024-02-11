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
}) {
  return (
    <div>
      {rows.map((row) => (
        <ListRowComponent
          key={row.id}
          row={row}
          onRowDragStart={onRowDragStart}
          onRowDragOver={onRowDragOver}
          onRowDrop={onRowDrop}
          onItemDragStart={onItemDragStart}
          onItemDragOver={onItemDragOver}
          onItemDrop={onItemDrop}
        />
      ))}
    </div>
  );
}

export default ListComponent;