/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import ListComponent from './ListComponent';

import './layout.scss';

function LayoutComponent() {
  return (
    <div className="main">
      <ListComponent />
    </div>
  );
}

export default LayoutComponent;
