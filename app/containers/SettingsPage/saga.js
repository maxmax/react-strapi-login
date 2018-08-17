// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
// export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
// }

import { takeLatest, call, put } from 'redux-saga/effects';
import currentUser from 'utils/currentUser';
import request from 'utils/beRequest';
import { getSettingPageSuccess, getSettingPageError } from './actions';

import {
  GET_SETTING_PAGE,
} from './constants';

export function* getProfileSetting() {
  const token = currentUser.getToken('jwtToken');
  const requestURL = '/user/me';

  try {
    const userData = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(getSettingPageSuccess(userData));
  } catch (err) {
    yield put(getSettingPageError(err));
  }
}

export default function* profileSetting() {
  yield takeLatest(GET_SETTING_PAGE, getProfileSetting);
}
