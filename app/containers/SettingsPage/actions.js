/*
 *
 * SettingsPage actions
 *
 */

import {
  GET_SETTING_PAGE,
  GET_SETTING_PAGE_SUCCESS,
  GET_SETTING_PAGE_ERROR,
} from './constants';

export function getSettingPage() {
  return {
    type: GET_SETTING_PAGE,
  };
}

export function getSettingPageSuccess(payload) {
  return {
    type: GET_SETTING_PAGE_SUCCESS,
    payload,
  };
}


export function getSettingPageError(err) {
  return {
    type: GET_SETTING_PAGE_ERROR,
    err,
  };
}
