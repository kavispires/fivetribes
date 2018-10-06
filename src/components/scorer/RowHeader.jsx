import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

const RowHeader = ({ colors }) => (
  <li className="row header">
    <div className="cell-category" />
    <div className="cell-group-players">
      {colors.map(color => (
        <div
          key={`header-${color}`}
          className={`cell cell-${color} cell-${colors.length}`}
        >
          <span className="cell-header-span">
            <Image src="pawn" className="header-pawn" alt={color} />
          </span>
        </div>
      ))}
    </div>
  </li>
);

RowHeader.propTypes = {
  colors: PropTypes.array.isRequired,
};

export default RowHeader;
