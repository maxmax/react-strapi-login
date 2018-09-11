import { createSelector } from 'reselect';

/**
 * Direct selector to the userAvatar state domain
 */
const selectUserAvatarDomain = (state) => state.getIn(['userAvatar', 'data']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserAvatar
 */

const makeSelectUserAvatar = () => createSelector(
  selectUserAvatarDomain,
  (substate) => substate || {}
);

// makeSelectUserAvatarUpload

const selectUserAvatarUploadDomain = (state) => state.getIn(['userAvatar', 'sendData']);

const makeSelectUserAvatarUpload = () => createSelector(
  selectUserAvatarUploadDomain,
  (substate) => substate || {}
);


export default makeSelectUserAvatar;
export {
  makeSelectUserAvatar,
  selectUserAvatarDomain,
  makeSelectUserAvatarUpload,
};
