/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ItemComponent from './ItemComponent';
import './list-row.scss';

function ListRowComponent({ items, id, pos }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: 'solid',
    cursor: 'pointer',
    order: pos
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="products-row"
    >
      {
        items.map((prod, index) => (
          <div className="products-items" key={prod.id}>
            <ItemComponent
              key={`${prod.name}-${prod.id}`}
              name={prod.name}
              id={prod.id}
              price={prod.price}
              position={index}
            />
          </div>
        ))
      }
    </div>
  );
}

ListRowComponent.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  pos: PropTypes.string.isRequired
};

export default ListRowComponent;
