import React, { useEffect, useState } from 'react';
import './list.scss';

function ListComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="products-container">
      <div className="products-items">
        {
          products.map(({ name, price }) => (

            <div className="products-itemContainer">
              <div className="products-itemHeader">
                <h3 className="products-name">
                  {name}
                </h3>
                <figure className="products-imageContainer">
                  <img src="assets/images/default.jpg" title={name} alt={name} />
                </figure>
              </div>
              <div className="products-itemContent">
                <p>
                  Price:
                  <strong>
                    {price}
                  </strong>
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default ListComponent;
