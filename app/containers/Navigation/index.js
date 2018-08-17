/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Design
import Button from 'components/Button';

// Utils
import auth from 'utils/auth';

const Wrapper = styled.div`
  display: block;
  width: 100%;
  background: whitesmoke;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Ul = styled.ul`
  display: inline-block;
  padding: 0px;
  margin: 0px;
`;

const Li = styled.li`
  display: inline-block;
  > a {
    display: inline-block;
    padding: 15px 20px;
  }
`;

const ButtonStyled = styled(Button)`
  border: 1px solid #ccc;
  cursor: pointer;
`;

export default class Navigation extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { showButton: false }

  componentDidMount() {
    if (auth.getToken()) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (auth.getToken()) {
      this.setState({ showButton: true });
    }
  }

  logout = (e) => {
    e.preventDefault();
    auth.clearAppStorage();
    this.setState({ showButton: false });
  }

  render() {
    return (
      <Wrapper>
        <Ul>
          <Li>
            <Link to={'/'}>Home</Link>
          </Li>
          <Li>
            <Link to={'/about'}>About</Link>
          </Li>
        </Ul>
        { this.state.showButton ? (
          <Ul>
            <Li>
              <Link to={'/settings'}>Settings</Link>
            </Li>
            <Li>
              <ButtonStyled onClick={this.logout} type="button">Logout</ButtonStyled>
            </Li>
          </Ul>
        ) : <Li><Link to={'/auth/login'}>Login</Link></Li>}
      </Wrapper>
    );
  }
}
