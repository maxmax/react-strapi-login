/*
 *
 * UserAvatar actions
 *
 */

import {
  GET_USER_AVATAR,
  GET_USER_AVATAR_SUCCESS,
  GET_USER_AVATAR_ERROR,
  SEND_USER_AVATAR,
  SEND_USER_AVATAR_SUCCESS,
  SEND_USER_AVATAR_ERROR,
} from './constants';

export function getUserAvatar() {
  return {
    type: GET_USER_AVATAR,
  };
}

export function getUserAvatarSuccess(payload) {
  return {
    type: GET_USER_AVATAR_SUCCESS,
    payload,
  };
}


export function getUserAvatarError(err) {
  return {
    type: GET_USER_AVATAR_ERROR,
    err,
  };
}

export function sendUserAvatar(payload, resolve, reject) {
  return {
    type: SEND_USER_AVATAR,
    payload,
    resolve,
    reject,
  };
}

export function sendUserAvatarSuccess(payload) {
  return {
    type: SEND_USER_AVATAR_SUCCESS,
    payload,
  };
}


export function sendUserAvatarError(err) {
  return {
    type: SEND_USER_AVATAR_ERROR,
    err,
  };
}
