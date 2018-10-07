import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

const RowNumber = ({
  action,
  active,
  colors,
  disabled,
  hint,
  icon,
  name,
  toggleHint,
  values,
}) => (
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
            type="number"
            name={`${name}-${i}`}
            placeholder={values[i]}
            value={values[i] > 0 ? values[i] : ''}
            onChange={e => action(name, i, e.target.value)}
            onFocus={() => toggleHint(hint)}
            onBlur={() => toggleHint()}
            min="0"
            max="9"
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  </li>
);

RowNumber.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.string,
  colors: PropTypes.array.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hint: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toggleHint: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

RowNumber.defaultProps = {
  disabled: false,
  active: '',
};

export default RowNumber;
