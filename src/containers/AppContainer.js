import { connect } from 'react-redux';

import App from '../components/App';

import {
	selectMode
} from '../reducers/app';

const mapStateToProps = (state) => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
	selectMode
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
