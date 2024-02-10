import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ItemComponent from './ItemComponent';

import './list.scss';

function ListComponent() {
  const [products, setProducts] = useState([]);

  const handleItemsOrder = items => {
    const prods = items.map((item, index) => ({
      ...item, position: index
    }));

    let rows = [];
    let row = [];

    for (let i = 0; i < prods.length; i += 1) {
      if (i % 3 === 0 && i > 1) {
        rows = [...rows, row];
        row = [];
      }
      row = [...row, prods[i]];

      if (i + 1 === prods.length) {
        rows = [...rows, row];
      }
    }

    setProducts(prods);
  };

  useEffect(() => {
    fetch('http://localhost:4001/products')
      .then(response => response.json())
      .then(data => handleItemsOrder(data));
  }, []);

  const rearangeProds = (prods, oldIndex, newIndex) => {
    const ordered = prods.map(item => {
      const product = { ...item };
      if (product.position === oldIndex) {
        product.position = newIndex;
        return product;
      }

      if (oldIndex <= newIndex) {
        if (product.position >= oldIndex && product.position <= newIndex) {
          product.position -= 1;
        }
      } else
        if (product.position <= oldIndex && product.position >= newIndex) {
          product.position += 1;
        }

      return product;
    });
    return ordered;
  };

  const onHandleDragEnd = event => {
    const { active, over } = event;
    const oldIndex = products.findIndex(item => item.id === active.id);
    const newIndex = products.findIndex(item => item.id === over.id);
    const ordered = rearangeProds(products, oldIndex, newIndex);
    const sortedProducts = ordered.sort(
      (p1, p2) => (
        // eslint-disable-next-line no-nested-ternary
        (p1.position > p2.position) ? 1
          : (p1.position < p2.position) ? -1
            : 0)
    );

    handleItemsOrder(sortedProducts);
  };

  return (
    <section className="products-container">
      <div className="products-items">
        {
          // products.map(({ name, price }) => (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onHandleDragEnd}
          >
            <SortableContext
              items={products}
              strategy={verticalListSortingStrategy}
            >
              {
                products.map(({ name, price, id }, index) => (
                  <ItemComponent
                    key={`${name}-${id}`}
                    name={name}
                    id={id}
                    price={price}
                    position={index}
                  />
                ))
              }
            </SortableContext>
          </DndContext>

        }
      </div>
    </section>
  );
}

export default ListComponent;
