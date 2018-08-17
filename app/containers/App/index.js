/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from 'containers/Navigation/Loadable';
import AuthPage from 'containers/AuthPage';
import ConnectPage from 'containers/ConnectPage';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SecurePage from 'containers/SecurePage';
import SettingsPage from 'containers/SettingsPage';
import ProtectedRoute from 'containers/ProtectedRoute';

const AppWrapper = styled.div``;

export default function App() {
  return (
    <AppWrapper>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <ProtectedRoute exact path="/settings/" component={SettingsPage} />
        <Route exact path="/connect/:provider" component={ConnectPage} />
        <Route exact path="/auth/:authType/:id?" component={AuthPage} />
        <ProtectedRoute exact path="/:foo" component={SecurePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppWrapper>
  );
}
