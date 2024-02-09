import React, { useEffect, useState } from 'react';
import ItemComponent from './ItemComponent';
import './list.scss';

function ListComponent() {
  const [products, setProducts] = useState([]);

  const handleItemsOrder = items => {
    // const qty = Math.ceil(items.length / 3);
    let rows = [];
    let row = [];

    for (let i = 0; i < items.length; i += 1) {
      if (i % 3 === 0 && i > 1) {
        rows = [...rows, row];
        row = [];
      }
      row = [...row, items[i]];

      if (i + 1 === items.length) {
        rows = [...rows, row];
      }
    }

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
