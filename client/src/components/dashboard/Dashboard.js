import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';

const Dashboard = ({ getCurrentProfile, profileState, authState }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { profile } = profileState;
  const { user } = authState;

  return (
    <div>
      Dashboard:{' '}
      {profile ? (
        <div>
          {profile.map((i) => {
            if (i.user._id === user._id) {
              return i.website;
            }
            return '';
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profileReducer,
  authState: state.authReducer,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
