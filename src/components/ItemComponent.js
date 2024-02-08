import React from 'react';
import PropTypes from 'prop-types';
import './item.scss';

function ItemComponent({ name, price }) {
  return (
    <div className="product-itemContainer">
      <div className="product-itemHeader">
        <h3 className="product-name">
          {name}
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
  price: PropTypes.number.isRequired
};
export default ItemComponent;
