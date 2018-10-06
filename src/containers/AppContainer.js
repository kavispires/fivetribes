import { connect } from 'react-redux';

import App from '../components/App';

import { handleBackButton, initialize, setScreen } from '../reducers/app';

import {
  clearCategory,
  handleColors,
  handleExpansions,
  handleNumPlayers,
  handleOk,
  prepareScorer,
  saveData,
  toggleHint,
  updateButtonCell,
  updateNumberCell,
  updateRadioCell,
} from '../reducers/scorer';

const mapStateToProps = state => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
  clearCategory,
  handleColors,
  handleBackButton,
  handleExpansions,
  handleNumPlayers,
  handleOk,
  initialize,
  prepareScorer,
  saveData,
  setScreen,
  toggleHint,
  updateButtonCell,
  updateNumberCell,
  updateRadioCell,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
