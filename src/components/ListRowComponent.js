import React from 'react';
import PropTypes from 'prop-types';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ItemComponent from './ItemComponent';
import './list-row.scss';
function ListRowComponent({ id, items, pos, onHandleDragEnd }) {
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
    border: 'solid',
    cursor: 'grab',
    order: pos,
  };

  return (
    <SortableContext
      items={items.map((prod) => prod.id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="products-row"
      >
        {items.map((prod, index) => (
          <div
            className="products-items"
            key={prod.id}
            role="button"
          >
            <ItemComponent
              id={prod.id}
              name={prod.name}
              price={prod.price}
              position={index}
            />
          </div>
        ))}
      </div>
    </SortableContext>
  );
}

ListRowComponent.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  pos: PropTypes.number.isRequired,
  onHandleDragEnd: PropTypes.func.isRequired,
};

export default ListRowComponent;