import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

const RowButton = ({ action, active, colors, icon, link, name, values }) => (
  <li className="row">
    <div className="cell-category">
      <Image src={`category-${icon}`} className="category" alt={name} />
    </div>
    <div className={`cell-group-players ${active === name ? 'active' : ''}`}>
      {colors.map((color, i) => (
        <div
          key={`${name}-${color}`}
          className={`cell cell-${color} cell-${colors.length}`}
        >
          <input
            type="button"
            name={`${name}-${i}`}
            value={values[i]}
            onClick={() => action(link)}
          />
        </div>
      ))}
    </div>
  </li>
);

RowButton.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default RowButton;
