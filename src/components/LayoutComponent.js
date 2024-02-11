/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';
import ListComponent from './ListComponent';
import './layout.scss';

function LayoutComponent() {
  const [position, setPosition] = useState('flex-end');

  const handleAlignment = pos => {
    setPosition(pos.target.id);
  };

  return (
    <div className="main">
      <div className="control-container">
        <div className="control-aligners">
          <button type="button" id="flex-start" onClick={handleAlignment}>|-</button>
          <button type="button" id="center" onClick={handleAlignment}>-|-</button>
          <button type="button" id="flex-end" onClick={handleAlignment}>-|</button>
        </div>
      </div>
      <ListComponent position={position} />
    </div>
  );
}

export default LayoutComponent;
