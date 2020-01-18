import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Root from './root';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Root);
