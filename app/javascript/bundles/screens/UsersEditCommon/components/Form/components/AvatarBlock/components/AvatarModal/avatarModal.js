import React, { Component } from 'react';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { string, object, file, bool, func } from 'prop-types';

import Loader from 'components/Loader';

const propTypes = {
  fileUrl: string,
  file: object,
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  updateCurrentUserAvatarDispatch: func.isRequired
};

class AvatarModal extends Component {
  state = {
    zoom: 1,
    inProcess: false
  };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleZoomChange = (e) => this.setState({ zoom: e.target.value });

  updateUserAvatarHandler = () => {
    const { updateCurrentUserAvatarDispatch, file, toggle } = this.props;

    const callback = () => {
      toggle();
      toastr.success('', { component: <FormattedMessage id='user.success_messages.avatar_update' /> });
      this.setState({ inProcess: false });
    };
    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    this.editor.getImageScaledToCanvas().toBlob((thumbnailAvatar) => {
      updateCurrentUserAvatarDispatch({
        originalAvatar: file,
        thumbnailAvatar,
        callback, errorCallback });
    });
  };

  render() {
    const {
      handleZoomChange,
      updateUserAvatarHandler,
      state: { zoom, inProcess },
      props: { fileUrl, isOpen, toggle }
    } = this;

    return (
      <Modal { ...{ isOpen, toggle } }>
        <ModalHeader { ...{ toggle } } charCode='x' >
          <FormattedMessage id='modals.change_user_avatar' />
        </ModalHeader>
        <ModalBody>
          <div>
            <AvatarEditor
              ref={ (editor) => this.editor = editor }
              image={ fileUrl }
              width={ 250 }
              height={ 250 }
              borderRadius={ 250 }
              scale={ zoom }
            />
          </div>
          <div>
            <input
              type='range'
              step={ 0.05 }
              min={ 1 }
              max={ 3 }
              value={ zoom }
              onChange={ handleZoomChange }
            />
          </div>
          <div>
            <Button onClick={ updateUserAvatarHandler } >
              <FormattedMessage id='actions.save_changes' />
            </Button>
          </div>
          { inProcess && <Loader /> }
        </ModalBody>
      </Modal>
    );
  }
};
AvatarModal.propTypes = propTypes;

export default AvatarModal;
