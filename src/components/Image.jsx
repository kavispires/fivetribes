import React from 'react';
import PropTypes from 'prop-types';

// All image imports
import borderLeft from '../images/border-left.png';
import borderRight from '../images/border-right.png';
import colorBlack from '../images/color-black.svg';
import colorBrown from '../images/color-brown.svg';
import colorCyan from '../images/color-cyan.svg';
import colorOrange from '../images/color-orange.svg';
import colorPink from '../images/color-pink.svg';
import expansionArtisans from '../images/expansion-artisans.svg';
import expansionThieves from '../images/expansion-thieves.svg';
import expansionWhims from '../images/expansion-whims.svg';
import logo from '../images/logo.png';
import players1 from '../images/players-1.svg';
import players2 from '../images/players-2.svg';
import players3 from '../images/players-3.svg';
import players4 from '../images/players-4.svg';
import players5 from '../images/players-5.svg';

const Image = ({ src, className, alt }) => {
  let source = null;

  switch (src) {
    case 'border-left':
      source = borderLeft;
      break;

    case 'border-right':
      source = borderRight;
      break;

    case 'color-black':
      source = colorBlack;
      break;

    case 'color-brown':
      source = colorBrown;
      break;

    case 'color-cyan':
      source = colorCyan;
      break;

    case 'color-orange':
      source = colorOrange;
      break;

    case 'color-pink':
      source = colorPink;
      break;

    case 'expansion-artisans':
      source = expansionArtisans;
      break;

    case 'expansion-thieves':
      source = expansionThieves;
      break;

    case 'expansion-whims':
      source = expansionWhims;
      break;

    case 'logo':
      source = logo;
      break;

    case 'players-1':
      source = players1;
      break;

    case 'players-2':
      source = players2;
      break;

    case 'players-3':
      source = players3;
      break;

    case 'players-4':
      source = players4;
      break;

    case 'players-5':
      source = players5;
      break;

    default:
      source = null;
  }

  return <img src={source} alt={alt} className={className} />;
};

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

Image.defaultProps = {
  alt: 'image',
};

export default Image;
