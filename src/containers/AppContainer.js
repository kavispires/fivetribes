import { connect } from 'react-redux';

import App from '../components/App';

import { handleHomeButton, initialize } from '../reducers/app';

const mapStateToProps = state => ({ app: state.app, scorer: state.scorer });

const mapDispatchToProps = {
  handleHomeButton,
  initialize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
