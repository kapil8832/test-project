import React, { useState } from 'react';

const CustomTooltip = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Hover me"
        className="border p-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isTooltipVisible && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
          This is your tooltip content.
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
