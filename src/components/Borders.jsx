import React from 'react';

import borderLeft from '../images/fancy-border-left.png';
import borderRight from '../images/fancy-border-right.png';

const Borders = () => (
  <div>
    <img src={borderLeft} alt="Border Left" className="border border-left" />
    <img src={borderRight} alt="Border Right" className="border border-right" />
  </div>
);

export default Borders;
