import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AvatarModal from './avatarModal';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    updateCurrentUserAvatarDispatch: actions.updateCurrentUserAvatar
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModal);
