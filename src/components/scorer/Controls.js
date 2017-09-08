import React from 'react';

import { CONTROL_CLASSES } from '../../constants';

const Controls = ({props}) => {
  const {controls} = props.scorer;

  const parentClasses = controls.length > 2 ? 'align-right' : '';

  return (
  	<section className={`screen-controls ${parentClasses}`} onClick={props.controller}>
  	{
  		controls.map((item, i) => {
        const buttonClasses = CONTROL_CLASSES[item.label] || 'btn';

  			return (
  				<input key={item.label} type="button" name={item.action} className={buttonClasses} value={item.label} />
  			);
  		})
  	}
  	</section>
  );
};

export default Controls;
