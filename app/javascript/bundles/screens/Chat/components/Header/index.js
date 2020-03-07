import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './header';

import { selectors, actions } from 'core/chat';

const mapStateToProps = state => ({
  companion: selectors.getChatCompanion(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
