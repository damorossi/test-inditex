import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import ListRowComponent from './ListRowComponent';
import './list.scss';

function ListComponent() {
  const [products, setProducts] = useState([]);

  const handleItemsOrder = (items) => {
    if (!items) {
      return;
    }
    const prods = items.map((item, index) => ({
      ...item,
      position: index,
    }));
    setProducts(prods);
  };

  useEffect(() => {
    fetch('http://localhost:4001/userRows')
      .then(response => response.json())
      .then(data => handleItemsOrder(data));
  }, []);

  const onHandleDragEnd = (event) => {
    const { active, over } = event;

    const updatedProducts = [...products];

    const sourceRowIndex = products.findIndex((row) => row.items.some((item) => item.id === active.id));
    const movedItemIndex = updatedProducts[sourceRowIndex].items.findIndex((item) => item.id === active.id);

    if (sourceRowIndex !== -1 && movedItemIndex !== -1) {
      const movedItem = updatedProducts[sourceRowIndex].items.splice(movedItemIndex, 1)[0];

      if (over && over.id) {
        // If dropped over a valid row, insert the item into that row
        const destinationRowIndex = updatedProducts.findIndex((row) => row.id === over.id);
        if (destinationRowIndex !== -1) {
          updatedProducts[destinationRowIndex].items.push(movedItem);
        }
      }

      handleItemsOrder(updatedProducts);
    }
  };

  return (
    <section className="products-container">
      <div className="products-rows">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onHandleDragEnd}
        >
          <SortableContext
            items={products.flatMap((row) => row.items.map((item) => item.id))}
            strategy={verticalListSortingStrategy}
          >
            {products.map((row, pos) => (
              <ListRowComponent
                key={row.id}
                id={row.id}
                items={row.items}
                pos={pos}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}

export default ListComponent;
