/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
// import ItemComponent from './ItemComponent';
import ListRowComponent from './ListRowComponent';
import './list.scss';

function ListComponent() {
  const [products, setProducts] = useState([]);

  const handleItemsOrder = items => {
    if (!items) {
      return;
    }
    const prods = items.map((item, index) => ({
      ...item, position: index
    }));
    setProducts(prods);
  };

  useEffect(() => {
    fetch('http://localhost:4001/userRows')
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
      } else if (product.position <= oldIndex && product.position >= newIndex) {
        product.position += 1;
      }

      return product;
    });
    return ordered;
  };

  const onHandleDragEnd = event => {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log(event);
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
      <div className="products-rows">
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
                products.map((row, pos) => (
                  <ListRowComponent items={row.items} id={row.id} pos={pos} key={row.id} />
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
