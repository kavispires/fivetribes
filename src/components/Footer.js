import React from 'react';

const Footer = ({props}) => {

	// Shows nav bar when nav array has any buttons
	const footerClass = props.nav.length > 0 ? 'screen-footer' : 'screen-footer-bar';

	const buttonClasses = `btn btn-primary btn-${props.nav.length}`;

  return (
  	<footer className={footerClass}>
  	{
  		props.nav.map((item, i) => {
  			return (
  				<input key={item} type="button" name="" className={buttonClasses} value={item} />
  			);
  		})
  	}
  	</footer>
  );
};

export default Footer;
