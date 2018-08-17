/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSettingsPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getSettingPage } from './actions';
import messages from './messages';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 10rem;
  padding-bottom: 10rem;
  background: #fafafb;
  text-align: center;
`;

const Well = styled.div`
  border: 4px solid #673AB7;
  padding: 35px;
  width: 800px;
  max-width: 100%;
`;

export class SettingsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getSettingPage();
  }

  render() {
    const { settingspage } = this.props;
    return (
      <div>
        <Helmet>
          <title>SettingsPage</title>
          <meta name="description" content="Description of SettingsPage" />
        </Helmet>
        <Wrapper>
          <Well>
            <FormattedMessage {...messages.header} />
            <hr />
            {settingspage && (
              <div>
                <p><b>{settingspage.username}</b></p>
                <p><i>{settingspage.email}</i></p>
              </div>
            )}
            <p>
              <Link to="/">Back to HomePage</Link>
            </p>
          </Well>
        </Wrapper>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  settingspage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingspage: makeSelectSettingsPage(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getSettingPage }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'settingsPage', reducer });
const withSaga = injectSaga({ key: 'settingsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
