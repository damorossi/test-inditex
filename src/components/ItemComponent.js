import React from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './item.scss';

function ItemComponent({
  id, name, price,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ddd',
    padding: '5px',
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="product-listRow"
    >
      <div className="product-itemHeader">
        <h3 className="product-name">{name}</h3>
        <figure className="product-imageContainer">
          <img src="assets/images/default.jpg" title={name} alt={name} />
        </figure>
      </div>
      <div className="product-itemContent">
        <p>
          Price: <strong>{price}</strong>
        </p>
      </div>
    </div>
  );
}

ItemComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // Remove the position prop from propTypes
};

export default ItemComponent;