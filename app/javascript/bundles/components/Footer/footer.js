import React from 'react';
import { defaultMessages } from 'locales/default';
import {} from 'prop-types';

const propTypes = {};

const Footer = (props) => {
  return (
    <footer className='text-center'>
      © CheSSSpace.&nbsp;
      All rights reserved
      <a href='mailto:chessspace@gmail.com'> ourchessspace@gmail.com</a>
    </footer>
  );
};
Footer.propTypes = propTypes;

export default Footer;
