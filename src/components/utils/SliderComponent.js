import React, { useState } from 'react';

function SliderComponent({ onHandleDrag }) {
  const [sliderValue, setSliderValue] = useState(80);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onHandleDrag(newValue);

  };

  return (
    <div className="slidecontainer">
      <input
        type="range"
        min="40"
        max="100"
        value={sliderValue}
        className="slider"
        id="myRange"
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default SliderComponent;