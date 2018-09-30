import { connect } from 'react-redux';

import App from '../components/App';

import { handleBackButton, initialize, setScreen } from '../reducers/app';

import {
  handleColors,
  handleExpansions,
  handleNumPlayers,
  initializeScorer,
} from '../reducers/scorer';

const mapStateToProps = state => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
  handleColors,
  handleBackButton,
  handleExpansions,
  handleNumPlayers,
  initialize,
  initializeScorer,
  setScreen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
