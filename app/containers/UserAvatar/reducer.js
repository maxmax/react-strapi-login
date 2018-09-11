/*
 *
 * UserAvatar reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   GET_USER_AVATAR,
   GET_USER_AVATAR_SUCCESS,
   GET_USER_AVATAR_ERROR,
   SEND_USER_AVATAR,
   SEND_USER_AVATAR_SUCCESS,
   SEND_USER_AVATAR_ERROR,
  } from './constants';

 const initialState = fromJS({
   pending: false,
   error: null,
   data: null,
   sendPending: false,
   sendError: null,
   sendData: null,
 });

function userAvatarReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_AVATAR:
      return state
        .set('pending', true);

    case GET_USER_AVATAR_SUCCESS:
      return state
        .set('pending', false)
        .set('data', action.payload);

    case GET_USER_AVATAR_ERROR:
      return state
        .set('pending', false)
        .set('error', action.err);

    case SEND_USER_AVATAR:
      return state
        .set('sendPending', true);

    case SEND_USER_AVATAR_SUCCESS:
      return state
        .set('sendPending', false)
        .set('sendData', action.payload);

    case SEND_USER_AVATAR_ERROR:
      return state
        .set('sendPending', false)
        .set('sendError', action.err);

    default:
      return state;
  }
}

export default userAvatarReducer;
