import { connect } from 'react-redux';

import App from '../components/App';

import {
	selectMode
} from '../reducers/app';

import {
	controller,
	setExpansions,
	setNumPlayers,
	updateCell,
	updateScreen,
} from '../reducers/scorer';

const mapStateToProps = (state) => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
	controller,
	selectMode,
	setExpansions,
	setNumPlayers,
	updateCell,
	updateScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
