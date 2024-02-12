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
      {
        id: 104,
        name: "Product D",
        photo: "photo_url_D.jpg",
        price: 49.99,
        pos: 3,
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

test('handleRowDrop selectedRowItem < 0', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  let container;

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

  const event = fireEvent.drop(droppedRowElement, { dataTransfer: mockDataTransfer });

  const rows = screen.getAllByRole('row-container')

  expect(rows[0].getAttribute('data-testid')).toBe(`row-${droppedRow.id}`)
  expect(rows[1].getAttribute('data-testid')).toBe(`row-${draggedRow.id}`)
});

