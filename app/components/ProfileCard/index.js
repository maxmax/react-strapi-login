import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserAvatar from 'containers/UserAvatar/Loadable';

const CardWrapper = styled.div`
  margin: 40px 0px;
  text-align: center;
  display: block;
`;

const CardTitle = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 5px;
`;

const CardEmail = styled.div`
  margin-bottom: 10px;
`;

const CardRole = styled.div`
  margin-bottom: 10px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 500;
`;

const CardAvatar = styled.div`
  position: relative;
`;

class ProfileCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { name, email, role, userId } = this.props;

    return (
      <CardWrapper>
        <CardAvatar>
          <UserAvatar userId={userId} />
        </CardAvatar>
        <CardTitle>{ name }</CardTitle>
        <CardRole>( { role } )</CardRole>
        <CardEmail>{ email }</CardEmail>
      </CardWrapper>
    );
  }
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  userId: PropTypes.string,
};

// ProfileCard.defaultProps = {
// };

export default ProfileCard;
