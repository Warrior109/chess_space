import React, { Component } from 'react';
import { shape, string } from 'prop-types';

import { AvatarModal } from './components';

const propTypes = {
  currentUser: shape({
    originalAvatar: shape({
      url: string
    }).isRequired
  }).isRequired
};

class AvatarBlock extends Component {
  state = {
    fileUrl: null,
    isAvatarModalOpen: false
  };

  handleFile = ({ target: { files } }) => {
    let reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      this.setState({ isAvatarModalOpen: true, fileUrl: reader.result, file: files[0] });
    };
  };

  toggleAvatarModal = () => this.setState((state) => ({ isAvatarModalOpen: !state.isAvatarModalOpen }));

  render() {
    const {
      handleFile,
      toggleAvatarModal,
      state: { fileUrl, file, isAvatarModalOpen },
      props: { currentUser: { originalAvatar } }
    } = this;

    return (
      <div>
        <div>
          <img src={ originalAvatar.url } width={ 300 } alt='IMAGE BLOCK' />
        </div>
        <input type='file' accept='image/*' onChange={ handleFile } />
        <AvatarModal isOpen={ isAvatarModalOpen } toggle={ toggleAvatarModal } { ...{ fileUrl, file } } />
      </div>
    );
  }
};
AvatarBlock.propTypes = propTypes;

export default AvatarBlock;
