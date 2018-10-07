import { connect } from 'react-redux';

import App from '../components/App';

import { handleBackButton, initialize, setScreen } from '../reducers/app';

import {
  clearCategory,
  handleActivePlayer,
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
  handleSelectedTile,
} from '../reducers/scorer';

const mapStateToProps = state => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
  clearCategory,
  handleActivePlayer,
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
  handleSelectedTile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
