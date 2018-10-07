import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

const RowRadio = ({ action, colors, hint, icon, name, toggleHint, values }) => (
  <li className="row">
    <div className="cell-category">
      <Image src={`category-${icon}`} className="category" alt={name} />
    </div>
    <div className="cell-group-players">
      {colors.map((color, i) => (
        <div
          key={`${name}-${color}`}
          className={`cell cell-${color} cell-${colors.length}`}
        >
          <input
            type="radio"
            name={`${name}-${i}`}
            checked={values[i]}
            onChange={() => action(name, i)}
            onFocus={() => toggleHint(hint)}
            onBlur={() => toggleHint()}
          />
        </div>
      ))}
    </div>
  </li>
);

RowRadio.propTypes = {
  action: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
  hint: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toggleHint: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

export default RowRadio;
