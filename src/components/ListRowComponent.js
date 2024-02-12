import React, { useState } from 'react';
import ItemComponent from './ItemComponent';

import './list-row.scss';

function ListRowComponent({
  row,
  onRowDragStart,
  onRowDragOver,
  onRowDrop,
  onItemDragStart,
  onItemDragOver,
  onItemDrop,

}) {
  const [position, setPosition] = useState(row.pos);
  const handleAlignment = pos => {
    setPosition(pos.target.id);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onRowDragStart(e, row.pos)}
      onDragOver={(e) => onRowDragOver(e)}
      onDrop={(e) => onRowDrop(e, row.pos)}
      style={{}}
      className="row-container"
      data-testid={`row-${row.id}`}
      role="row-container"
    >
      <div style={{ display: 'flex', flexDirection: 'row', float: row.align }} >
        <div className="row-controllers">
          <div className="control-aligners">
            <button type="button" id="flex-start" onClick={handleAlignment}>|-</button>
            <button type="button" id="center" onClick={handleAlignment}>-|-</button>
            <button type="button" id="flex-end" onClick={handleAlignment}>-|</button>
          </div>
        </div>
        {row.items?.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onItemDragStart(e, row.pos, index)}
            onDragOver={(e) => onItemDragOver(e)}
            onDrop={(e) => onItemDrop(e, row.pos, index)}
            style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}
            data-testid={`item-${row.id}`}
          >
            <ItemComponent name={item?.name} price={item?.price} />
          </div>
        ))}
      </div>
    </div >
  );
}

export default ListRowComponent;