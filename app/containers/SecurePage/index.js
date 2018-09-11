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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  text-align: center;
`;

const Well = styled.div`
  border: 4px solid #4CAF50;
  padding: 35px;
  width: 800px;
  max-width: 100%;
`;

export class SecurePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Well>
          <h1>Now that you are logged in you have access to this page</h1>
          <hr />
          <p>
            <Link to={`/${Math.random()}`}>Go to another protected url</Link>
          </p>
          <p>
            <Link to="/">Back to HomePage</Link>
          </p>
        </Well>
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
