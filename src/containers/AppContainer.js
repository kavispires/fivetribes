import { connect } from 'react-redux';

import App from '../components/App';

import { handleBackButton, initialize, setScreen } from '../reducers/app';

import {
  handleColors,
  handleExpansions,
  handleNumPlayers,
  prepareScorer,
  saveData,
  toggleHint,
  updateButtonCell,
  updateNumberCell,
} from '../reducers/scorer';

const mapStateToProps = state => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
  handleColors,
  handleBackButton,
  handleExpansions,
  handleNumPlayers,
  initialize,
  prepareScorer,
  saveData,
  setScreen,
  toggleHint,
  updateButtonCell,
  updateNumberCell,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
