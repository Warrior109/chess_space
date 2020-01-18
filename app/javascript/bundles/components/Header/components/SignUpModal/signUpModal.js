import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { bool, func } from 'prop-types';

const propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired
};

const SignUpModal = ({ isOpen, toggle }) => {
  return (
    <Modal { ...{ isOpen, toggle } } >
      <ModalHeader { ...{ toggle } } charCode='x'>
        <FormattedMessage id='registration' />
      </ModalHeader>
      <ModalBody>
        Body
      </ModalBody>
      <ModalFooter>
        Footer
      </ModalFooter>
    </Modal>
  );
};
SignUpModal.propTypes = propTypes;

export default SignUpModal;
