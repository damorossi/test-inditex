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
  onHandleAlignment

}) {

  const handleAlignment = (pos, id) => {
    onHandleAlignment(pos, id);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onRowDragStart(e, row.pos)}
      onDragOver={(e) => onRowDragOver(e)}
      onDrop={(e) => onRowDrop(e, row.pos)}
      style={{}}
      data-testid={`row-${row.id}`}
      role="row-container"
      className={`row-container row-container--${row.align}`}
    >
      <div style={{ display: 'flex', flexDirection: 'row', float: row.align }} >
        <div className="row-controllers">
          <div className="control-aligners">
            <button type="button" id="flex-start" onClick={() => handleAlignment('initial', row.id)}>{row.align}</button>
            <button type="button" id="center" onClick={() => handleAlignment('normal', row.id)}>-|-</button>
            <button type="button" id="flex-end" onClick={() => handleAlignment('last', row.id)}>-|</button>
          </div>
        </div>
        {
          row.items?.map((item, index) => (
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
          ))
        }
      </div >
    </div >
  );
}

export default ListRowComponent;