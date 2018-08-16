/**
 *
 * SecurePage
 * Container that is accessible only if the user is logged in
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSecurePage from './selectors';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div``;

const Well = styled.div`
  border-color: #4CAF50;
  width: 800px;
  max-width: 100%;
`;

export class SecurePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <section className="container">
          <Well className="well">
            <h1>Now that you are logged in you have access to this page</h1>
            <hr />
            <p>
              <Link to={`/${Math.random()}`}>Go to another protected url</Link>
            </p>
            <p>
              <Link to="/">Back to HomePage</Link>
            </p>
          </Well>
        </section>
      </Wrapper>
    );
  }
}

SecurePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  securepage: makeSelectSecurePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'securePage', reducer });
const withSaga = injectSaga({ key: 'securePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SecurePage);
