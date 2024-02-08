import React, { useEffect, useState } from 'react';
import ItemComponent from './ItemComponent';
import './list.scss';

function ListComponent() {
  const [products, setProducts] = useState([]);

  const handleItemsOrder = items => {
    // TODO: create an array with an inner array of 3 items each
    // let tempAr = [];

    // items.forEach((item, index) => {
    //   tempAr = index % 3 === 0 ? [] : [...tempAr, item];
    // });

    setProducts(items);
  };

  useEffect(() => {
    fetch('http://localhost:4001/products')
      .then(response => response.json())
      .then(data => handleItemsOrder(data));
  }, []);

  const onHandleDrag = param => {
    console.log('me están arrastrando', param);
  };

  const onDropHandler = param => {
    console.log('soltando', param);
  };

  return (
    <section className="products-container">
      <div className="products-items">
        {
          products.map(({ name, price }) => (
            <div onDragOver={() => onHandleDrag(name)} onDrop={onDropHandler}>
              <ItemComponent name={name} price={price} />
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default ListComponent;
