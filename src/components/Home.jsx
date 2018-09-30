import React from 'react';
import PropTypes from 'prop-types';

import borderLeft from '../images/fancy-border-left.png';
import borderRight from '../images/fancy-border-right.png';
import logo from '../images/logo.png';

const Home = ({ props }) => (
  <main className="container container-home">
    <img src={borderLeft} alt="Border Left" className="border border-left" />
    <img src={borderRight} alt="Border Right" className="border border-right" />
    <div className="home-content">
      <img src={logo} alt="logo" className="logo-image" />
      <div className="menu">
        <button
          type="button"
          className="btn-hollow btn-25"
          onClick={() => props.handleHomeButton('scorer')}
        >
          Scorer
        </button>
        <button type="button" disabled className="btn-hollow btn-25">
          Solitaire
        </button>
        <button type="button" disabled className="btn-hollow btn-25">
          Reference
        </button>
      </div>
    </div>
  </main>
);

Home.propTypes = {
  props: PropTypes.object.isRequired,
  handleHomeButton: PropTypes.func,
};

Home.defaultProps = {
  handleHomeButton: () => {},
};

export default Home;
