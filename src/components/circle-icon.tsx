import React from 'react';
import type { IconType } from 'react-icons';

const CircleIcon: React.FC<{ Icon: IconType }> = ({ Icon }) => {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center">
      <Icon size={24} />
    </div>
  );
};

export default CircleIcon;
