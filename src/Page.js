import React, { useState } from 'react';
import LayoutComponent from './components/LayoutComponent';
import SliderComponent from './components/utils/SliderComponent';

function Page() {
  const [widthValue, setWidth] = useState(`850px`);


  const handleZoom = perc => {
    const max = 950;
    const updatedPercentageInPixels = (max * perc) / 100;
    setWidth(`${updatedPercentageInPixels}px`);
  };

  return (
    <div className="slidecontainer">

      <SliderComponent onHandleDrag={(v) => handleZoom(v)} />
      <div style={{ width: widthValue }} >
        <LayoutComponent />
      </div>
    </div >
  );
}

export default Page; 