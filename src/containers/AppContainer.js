import { connect } from 'react-redux';

import App from '../components/App';

import { handleHomeButton, initialize } from '../reducers/app';

import {
  handleColors,
  handleExpansions,
  handleNumPlayers,
  initializeScorer,
} from '../reducers/scorer';

const mapStateToProps = state => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
  handleColors,
  handleExpansions,
  handleHomeButton,
  handleNumPlayers,
  initialize,
  initializeScorer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
