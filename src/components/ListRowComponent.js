import React, { useState } from 'react';
import ItemComponent from './ItemComponent';
import ButtonsComponent from './ButtonsComponent';

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

  const [isActionsVisible, setActionVisible] = useState(false);

  const showButtons = () => {
    setActionVisible(true)
  }
  const hideButttons = () => {

    setActionVisible(false)
  }

  const getButtons = () => {
    if (isActionsVisible) {
      return (
        <div className="row__controllers">
          <ButtonsComponent onHandleClick={onHandleAlignment} rowId={row.id} />
        </div>
      );
    }
    return null;
  }

  return (
    <div
      draggable
      onDragStart={(e) => onRowDragStart(e, row.pos)}
      onDragOver={(e) => onRowDragOver(e)}
      onDrop={(e) => onRowDrop(e, row.pos)}
      onMouseOver={showButtons}
      onMouseOut={hideButttons}
      data-testid={`row-${row.id}`}
      role="row-container"
      className={`row__container row__container--${row.align}`}
    >
      {/* <div className="row__"
        style={{ display: 'flex', flexDirection: 'row', float: row.align }}
      > */}
      {getButtons()}
      {
        row.items?.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onItemDragStart(e, row.pos, index)}
            onDragOver={(e) => onItemDragOver(e)}
            onDrop={(e) => onItemDrop(e, row.pos, index)}
            style={{ padding: '5px', margin: '5px', width: '30%' }}
            data-testid={`item-${item.id}`}
            role="product-item"
          >
            <ItemComponent img={item?.photo} name={item?.name} price={item?.price} />
          </div>
        ))
      }
      {/* </div > */}
    </div >
  );
}

export default ListRowComponent;