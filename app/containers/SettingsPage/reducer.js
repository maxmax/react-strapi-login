/*
 *
 * SettingsPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
  GET_SETTING_PAGE,
  GET_SETTING_PAGE_SUCCESS,
  GET_SETTING_PAGE_ERROR,
 } from './constants';

const initialState = fromJS({
  pending: false,
  error: null,
  data: null,
});

function settingsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETTING_PAGE:
      return state
        .set('pending', true);

    case GET_SETTING_PAGE_SUCCESS:
      return state
        .set('pending', false)
        .set('data', action.payload);

    case GET_SETTING_PAGE_ERROR:
      return state
        .set('pending', false)
        .set('error', action.err);

    default:
      return state;
  }
}

export default settingsPageReducer;
