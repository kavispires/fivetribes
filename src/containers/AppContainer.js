import { connect } from 'react-redux';

import App from '../components/App';

import {
	selectMode
} from '../reducers/app';

import {
	setExpansions,
	setNumPlayers,
} from '../reducers/scorer';

const mapStateToProps = (state) => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
	selectMode,
	setExpansions,
	setNumPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
