import { LOCATION_CHANGE } from 'react-router-redux';
import { all, call, fork, takeLatest, select, take, cancel } from 'redux-saga/effects';
import { set } from 'lodash';
import { history } from 'app';

// Utils
import auth from 'utils/auth';
import request from 'utils/request';

import { makeSelectFormType, makeSelectModifiedData } from './selectors';
import { SUBMIT } from './constants';

// const apiEndpoint = 'https://hidden-falls-59190.herokuapp.com';

export function* submitForm() {
  try {
    const formType = yield select(makeSelectFormType());
    const body = yield select(makeSelectModifiedData());
    let requestURL;

    switch (formType) {
      case 'login':
        requestURL = 'https://hidden-falls-59190.herokuapp.com/auth/local';
        break;
      case 'register':
        requestURL = 'https://hidden-falls-59190.herokuapp.com/auth/local/register';
        break;
      case 'reset-password':
        requestURL = 'https://hidden-falls-59190.herokuapp.com/auth/reset-password';
        break;
      case 'forgot-password':
        requestURL = 'https://hidden-falls-59190.herokuapp.com/auth/forgot-password';
        set(body, 'url', 'http://localhost:3000/auth/reset-password');
        break;
      default:

    }

    const response = yield call(request, requestURL, { method: 'POST', body });

    if (response.jwt) {
      // Set the user's credentials
      yield all([
        call(auth.setToken, response.jwt, body.rememberMe),
        call(auth.setUserInfo, response.user, body.rememberMe),
      ]);
      yield call(forwardTo, '/');
    }
  } catch(error) {
    console.log('error!', error.response.payload.message);
  }
}

export default function* defaultSaga() {
  const submitWatcher = yield fork(takeLatest, SUBMIT, submitForm);
  yield take(LOCATION_CHANGE);
  yield cancel(submitWatcher);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {Sting} location The path to navigate
 */
function forwardTo(location) {
  history.push(location);
}
