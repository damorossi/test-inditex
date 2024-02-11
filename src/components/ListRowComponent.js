{/* <div style={{ display: 'flex', flexDirection: 'row' }}> */ }
// ListRowComponent.js
import React from 'react';
import ItemComponent from './ItemComponent';

function ListRowComponent({
  row,
  onRowDragStart,
  onRowDragOver,
  onRowDrop,
  onItemDragStart,
  onItemDragOver,
  onItemDrop,
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onRowDragStart(e, row.pos)}
      onDragOver={(e) => onRowDragOver(e)}
      onDrop={(e) => onRowDrop(e, row.pos)}
      style={{ margin: '10px', border: '1px solid #ddd', padding: '10px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {row.items?.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onItemDragStart(e, item.id, row.pos, index)}
            onDragOver={(e) => onItemDragOver(e)}
            onDrop={(e) => onItemDrop(e, row.pos, index)}
            style={{ border: '1px solid #ccc', padding: '5px', marginBottom: '5px' }}
          >
            <ItemComponent name={item.name} price={item.price} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListRowComponent;