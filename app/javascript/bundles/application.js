import React, { Fragment, Component } from 'react';
import { object, any, array, string } from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { StaticRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'core/store';
import Layouts from 'layouts';
import { connectToSocket } from 'lib/utils';

const propTypes = {
  locale: string.isRequired,
  messages: object.isRequired,
  location: string.isRequired,
  context: object.isRequired,
  toastrData: array,
};

class Application extends Component {
  componentDidMount() {
    const { toastrData } = this.props;
    if (toastrData && toastrData.length) {
      toastrData.forEach(data => {
        toastr[data.type]('', data.message);
      });
    };
    connectToSocket();
  }

  render() {
    const { locale, messages, location, context } = this.props;

    return (
      <IntlProvider key={ locale } { ...{ locale, messages } } >
        <Fragment>
          {
            typeof window === 'undefined' ?
              <StaticRouter { ...{ location, context } } >
                <Layouts />
              </StaticRouter>
              :
              <ConnectedRouter history={ history } >
                <Layouts />
              </ConnectedRouter>
          }
          <ReduxToastr
            timeOut={ 4000 }
            newestOnTop={ false }
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            preventDuplicates
          />
        </Fragment>
      </IntlProvider>
    );
  }
};
Application.propTypes = propTypes;

export default Application;
