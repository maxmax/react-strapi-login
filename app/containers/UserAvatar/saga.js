import { takeLatest, call, put } from 'redux-saga/effects';
import currentUser from 'utils/currentUser';
import request from 'utils/beRequest';
import { getUserAvatarSuccess, getUserAvatarError, sendUserAvatarSuccess, sendUserAvatarError } from './actions';

import {
  GET_USER_AVATAR,
  SEND_USER_AVATAR,
} from './constants';

export function* getUserAvatar() {
  const token = currentUser.getToken('jwtToken');
  const requestURL = '/user/me';

  try {
    const userData = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(getUserAvatarSuccess(userData.avatar));
  } catch (err) {
    yield put(getUserAvatarError(err));
  }
}

export function* sendUserAvatar({ payload, resolve, reject }) {
  const token = currentUser.getToken('jwtToken');
  const requestURL = '/upload';

  const body = new FormData();
  body.append('files', payload.newFile);
  body.append('refId', payload.userId);
  body.append('ref', 'user');
  body.append('source', 'users-permissions');
  body.append('field', 'avatar');

  try {
    const payloadPost = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    yield put(sendUserAvatarSuccess({ resp: payloadPost, status: 'ok' }));

    if (typeof resolve === 'function') {
      // yield put(sendUserAvatarSuccess(profileSettingData));
      // console.log('saga - sendUserAvatar resolve!!!!!!!!!!!!!!!', payloadPost);
      resolve();
    }
  } catch (err) {
    if (typeof reject === 'function') {
      yield put(sendUserAvatarError(err));
      reject(err);
    }
  }
}

export default function* userAvatar() {
  yield takeLatest(GET_USER_AVATAR, getUserAvatar);
  yield takeLatest(SEND_USER_AVATAR, sendUserAvatar);
}
