import { createSelector } from 'reselect';

/**
 * Direct selector to the settingsPage state domain
 */
const selectDataDomain = (state) => state.getIn(['settingsPage', 'data']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by SettingsPage
 */
const makeSelectSettingsPage = () => createSelector(
  selectDataDomain,
  (substate) => substate || {}
);

export default makeSelectSettingsPage;
export {
  makeSelectSettingsPage,
};
