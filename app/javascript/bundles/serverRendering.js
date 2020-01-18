import 'lib/utils/arrayFlat';
import React from 'react';
import configureStore from './core/store';
import camelcaseKeys from 'camelcase-keys';
import { Provider } from 'react-redux';
import { object } from 'prop-types';

// import { addLocaleData } from 'react-intl';
import { translations } from '../locales/translations';
import Application from './application';

const propTypes = {
  toastrData: object
};
// Initizalize all locales for react-intl.
// const localesContext = require.context('react-intl/locale-data', true, /\w{2}\.js$/);
// const locales = localesContext.keys().map(localesContext);
// addLocaleData(locales.flat());
// global.intl = require('intl');

const ServerRendering = (props, railsContext) => {
  const { location, i18nLocale } = railsContext;
  const locale = i18nLocale;
  const messages = translations[locale];

  const toastrData = props.toastrData;
  delete props.toastrData;

  const store = configureStore(camelcaseKeys(props, { deep: true }));

  // Allows components to add properties to the object to store
  // information about the render.
  const context = {};

  return (
    <Provider store={ store }>
      <Application { ...{ locale, messages, location, context, toastrData } } />
    </Provider>
  );
};
ServerRendering.propTypes = propTypes;

export default ServerRendering;

