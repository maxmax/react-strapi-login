/**
 *
 * UserAvatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import Spinner from 'components/Spinner';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUserAvatar, makeSelectUserAvatarUpload } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getUserAvatar, sendUserAvatar } from './actions';

const GLOBAL_URL = 'https://hidden-falls-59190.herokuapp.com';

const AvatarWrapper = styled.div`
  position: relative;
  margin: 40px auto 30px;
  width: 160px;
  height: 160px;
  border-radius: 100%;
  border: 3px solid #dfdada;
  background: #dfdada;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  display: block;
  max-width: 100%;
  width: 160px;
  height: 160px;
  object-fit: cover;
`;

const AvatarUpload = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  > input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }
`;

export class UserAvatar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: true,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getUserAvatar();
    this.fileDefault();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.avatarUpload !== this.props.avatarUpload) {
      const { actions } = this.props;
      actions.getUserAvatar();
      this.setState({ file: null, loading: false });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  onChange(e) {
    e.preventDefault(); // Stop form submit
    this.setState({ file: e.target.files[0] });
    // Submit on Change
    this.fileUpload(e.target.files[0]);
  }

  fileUpload(file) {
    const { actions, userId } = this.props;
    actions.sendUserAvatar({ newFile: file, userId });
    this.setState({ loading: true });
  }

  fileDefault() {
    this.setState({ loading: false });
  }

  render() {

    const { avatar } = this.props;
    const currentUrl = avatar && avatar.url ? GLOBAL_URL + avatar.url : '';

    return (
      <div>
        <AvatarWrapper>
          <div>
            { currentUrl ? <AvatarImg src={currentUrl} /> : ''}
          </div>
          <AvatarUpload onSubmit={this.onFormSubmit}>
            <input type="file" onChange={this.onChange} />
          </AvatarUpload>
          { this.state.loading ? <Spinner /> : ''}
        </AvatarWrapper>
      </div>
    );
  }
}

UserAvatar.propTypes = {
  actions: PropTypes.object,
  avatar: PropTypes.object,
  avatarUpload: PropTypes.object,
  userId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  avatar: makeSelectUserAvatar(),
  avatarUpload: makeSelectUserAvatarUpload(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getUserAvatar, sendUserAvatar }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userAvatar', reducer });
const withSaga = injectSaga({ key: 'userAvatar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserAvatar);
