import React, { useState } from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import LayoutComponent from './LayoutComponent';

const mockData = [
  {
    id: 1,
    pos: 0,
    align: "left",
    items: [
      {
        id: 101,
        name: "Product A",
        photo: "photo_url_A.jpg",
        price: 19.99,
        pos: 0,
      },
      {
        id: 102,
        name: "Product B",
        photo: "photo_url_B.jpg",
        price: 29.99,
        pos: 1,
      },
      {
        id: 103,
        name: "Product C",
        photo: "photo_url_C.jpg",
        price: 39.99,
        pos: 2,
      },
    ],
  },
  {
    id: 2,
    pos: 1,
    align: "right",
    items: [
      {
        id: 105,
        name: "Product E",
        photo: "photo_url_E.jpg",
        price: 59.99,
        pos: 0,
      },
      {
        id: 106,
        name: "Product F",
        photo: "photo_url_F.jpg",
        price: 69.99,
        pos: 1,
      },
    ],
  },
  {
    id: 3,
    pos: 2,
    align: "left",
    items: [
      {
        id: 107,
        name: "Product G",
        photo: "photo_url_G.jpg",
        price: 79.99,
        pos: 0,
      },
      {
        id: 108,
        name: "Product H",
        photo: "photo_url_H.jpg",
        price: 89.99,
        pos: 1,
      },
      {
        id: 109,
        name: "Product I",
        photo: "photo_url_I.jpg",
        price: 99.99,
        pos: 2,
      },
    ],
  },
  {
    id: 4,
    pos: 3,
    align: "left",
    items: [
      {
        id: 110,
        name: "Product J",
        photo: "photo_url_J.jpg",
        price: 109.99,
        pos: 0,
      },
      {
        id: 104,
        name: "Product D",
        photo: "photo_url_D.jpg",
        price: 49.99,
        pos: 1,
      },
    ],
  },
];
const mockDataTransfer = {
  setData: jest.fn(),
  getData: jest.fn()
};

test('handleRowDragStart sets dataTransfer.setData with row position', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  await act(async () => {
    render(<LayoutComponent />);
  })
  const row = mockData[0]; // Get the first row from mock data
  const rowElement = screen.getByTestId(`row-${row.id}`); // Find the row element using its test id
  fireEvent.dragStart(rowElement, { dataTransfer: mockDataTransfer });

  expect(mockDataTransfer.setData).toHaveBeenCalledWith('text/plain', row.pos);
});

test('handleRowDrop is properly changing positions', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  await act(async () => {
    render(<LayoutComponent />)
  })

  // Dragged = pos 0
  // dropped = pos 1
  // we move the row with pos 0 to pos 1
  const draggedRow = mockData[0];

  const droppedRow = mockData[1];
  const droppedRowElement = screen.getByTestId(`row-${droppedRow.id}`); // Find element where we drop our dragged row

  mockDataTransfer.getData.mockImplementation(() => draggedRow.pos);

  fireEvent.drop(droppedRowElement, { dataTransfer: mockDataTransfer });

  const rows = screen.getAllByRole('row-container')

  expect(rows[0].getAttribute('data-testid')).toBe(`row-${droppedRow.id}`)
  expect(rows[1].getAttribute('data-testid')).toBe(`row-${draggedRow.id}`)
});

test('handleItemDrop swap correctly items on same row', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  await act(async () => {
    render(<LayoutComponent />)
  })

  const draggingRow = mockData[0];
  const draggedItem = mockData[0].items[1]; // id: 102
  const droppedItem = mockData[0].items[0]; // id: 101

  const droppedItemElement = screen.getByTestId(`item-${droppedItem.id}`); // Find element where we drop our dragged row
  const draggedItemElement = screen.getByTestId(`item-${draggedItem.id}`); // Find element where we drop our dragged row

  mockDataTransfer.getData.mockImplementation(() => JSON.stringify({ rowPos: 0, itemIndex: 1 }));
  mockDataTransfer.setData.mockImplementation(() => { })

  fireEvent.dragStart(draggedItemElement, { dataTransfer: mockDataTransfer });

  fireEvent.drop(droppedItemElement, { dataTransfer: mockDataTransfer });

  const items = screen.getAllByRole('product-item');

  expect(items[0].getAttribute('data-testid')).toBe(`item-${draggedItem.id}`)
  expect(items[1].getAttribute('data-testid')).toBe(`item-${droppedItem.id}`)
});


test('handleItemDrop should not swap when items are 3 on a row', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  await act(async () => {
    render(<LayoutComponent />)
  })

  const originalRowIndex = 1;
  const targetRowIndex = 0;
  const originalItemIndex = 0;
  const targetItemIndex = 1;

  const droppedRow = mockData[targetRowIndex];
  const draggedItem = mockData[originalRowIndex].items[originalItemIndex];
  const droppedItem = mockData[targetRowIndex].items[targetItemIndex];

  const droppedItemElement = screen.getByTestId(`item-${droppedItem.id}`); // Find element where we drop our dragged row
  const draggedItemElement = screen.getByTestId(`item-${draggedItem.id}`); // Find element that we drag

  mockDataTransfer.getData.mockImplementationOnce(() => JSON.stringify({ rowPos: originalRowIndex, itemIndex: originalItemIndex }));
  mockDataTransfer.setData.mockImplementationOnce(() => { })

  fireEvent.dragStart(draggedItemElement, { dataTransfer: mockDataTransfer });

  fireEvent.drop(droppedItemElement, { dataTransfer: mockDataTransfer });

  const row = screen.getByTestId(`row-${droppedRow.id}`);
  const rowItems = row.querySelectorAll('[role="product-item"]')

  expect(rowItems[targetItemIndex].getAttribute('data-testid')).toBe(`item-${droppedItem.id}`)
});

test('handleItemDrop should swap when items are 3 on a row 3', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  await act(async () => {
    render(<LayoutComponent />)
  })

  const originalRowIndex = 0;
  const targetRowIndex = 1;
  const originalItemIndex = 1;
  const targetItemIndex = 0;

  const draggingRow = mockData[targetRowIndex]; // id: 2, pos: 1,
  const draggedItem = mockData[originalRowIndex].items[originalItemIndex]; // product B - id: 102
  const droppedItem = mockData[targetRowIndex].items[targetItemIndex]; // product E - id: 105

  const droppedItemElement = screen.getByTestId(`item-${droppedItem.id}`); // Find element where we drop our dragged row
  const draggedItemElement = screen.getByTestId(`item-${draggedItem.id}`); // Find element that we drag

  mockDataTransfer.getData.mockImplementationOnce(() => JSON.stringify({ rowPos: originalRowIndex, itemIndex: originalItemIndex }));
  mockDataTransfer.setData.mockImplementationOnce(() => { })

  fireEvent.dragStart(draggedItemElement, { dataTransfer: mockDataTransfer });

  fireEvent.drop(droppedItemElement, { dataTransfer: mockDataTransfer });

  const row = screen.getByTestId(`row-${draggingRow.id}`);
  const rowItems = row.querySelectorAll('[role="product-item"]')

  expect(rowItems[0].getAttribute('data-testid')).toBe(`item-${draggedItem.id}`)
});

///@TODO testear botones de alineamiento

