import React from 'react';

import Image from './Image';

const Borders = () => (
  <div>
    <Image src="border-left" className="border border-left" alt="Border Left" />
    <Image
      src="border-right"
      className="border border-right"
      alt="Border Right"
    />
  </div>
);

export default Borders;
