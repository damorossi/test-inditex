import React from 'react';
import ItemComponent from './ItemComponent';

function ListRowComponent(row) {
  return (
    row.map(({ name, price, id }, index) => (
      <ItemComponent
        key={`${name}-${id}`}
        name={name}
        id={id}
        price={price}
        position={index}
      />
    ))
  );
}

export default ListRowComponent;
