import React from 'react';
import renderer from 'react-test-renderer';
import ListRowComponent from './ListRowComponent';

xtest('ListRowComponent renders correctly', () => {
  const row = {
    id: 1,
    items: [{ id: 101, name: 'Product A', price: 19.99 }],
  };

  const component = renderer.create(<ListRowComponent row={row} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});