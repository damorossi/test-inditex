import React from 'react';
import PropTypes from 'prop-types';
import './item.scss';

function ItemComponent({ name, price, img }) {
  return (
    <div className="product-listRow">
      <div className="product-itemHeader">
        <h3 className="product-name">{name}</h3>
        <figure className="product-imageContainer">
          <img src={'assets/images/' + img} title={name} alt={name} />
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // Remove 'position' from prop types
};

export default ItemComponent;
