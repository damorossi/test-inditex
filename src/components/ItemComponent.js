/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './item.scss';

function ItemComponent({
  name, price, id, position
}) {
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
    order: position
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="product-itemContainer"
    >
      <div className="product-itemHeader">
        <h3 className="product-name">
          {name}
          -
          {id}
        </h3>
        <figure className="product-imageContainer">
          <img src="assets/images/default.jpg" title={name} alt={name} />
        </figure>
      </div>
      <div className="product-itemContent">
        <p>
          Price:
          <strong>
            {price}
          </strong>
        </p>
      </div>
    </div>
  );
}

ItemComponent.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default ItemComponent;
