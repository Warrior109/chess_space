import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Button} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {} from 'prop-types';

import { paths } from 'layouts/constants';
import { DeleteConfirmationModal } from './components';

const propTypes = {};

class Navbar extends Component {
  state = {
    isDeleteConfirmationModalOpen: false
  };

  toggleDeleteConfirmationModal = () => {
    this.setState((state) => ({
      isDeleteConfirmationModalOpen: !state.isDeleteConfirmationModalOpen
    }));
  }

  render() {
    const {
      toggleDeleteConfirmationModal,
      state: { isDeleteConfirmationModalOpen}
    } = this;

    return (
      <div>
        <div>
          <NavLink to={ paths.USERS_EDIT_COMMON } >
            <FormattedMessage id='pages.profile_edit.common' />
          </NavLink>
        </div>
        <div>
          <NavLink to={ paths.USERS_EDIT_CONTACTS } >
            <FormattedMessage id='pages.profile_edit.contacts' />
          </NavLink>
        </div>
        <div>
          <NavLink to={ paths.USERS_EDIT_SECURITY } >
            <FormattedMessage id='pages.profile_edit.security' />
          </NavLink>
        </div>
        <div>
          <Button color='danger' onClick={ toggleDeleteConfirmationModal } >
            <FormattedMessage id='modals.delete_account.title' />
          </Button>
        </div>
        <DeleteConfirmationModal
          isOpen={ isDeleteConfirmationModalOpen }
          toggle={ toggleDeleteConfirmationModal }
        />
      </div>
    );
  }
};
Navbar.propTypes = propTypes;

export default Navbar;
