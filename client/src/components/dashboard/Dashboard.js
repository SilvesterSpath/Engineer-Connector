import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';

const Dashboard = ({ getCurrentProfile, profileState, authState }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { user } = authState;
  const { profile, loading } = profileState;
  console.log(profileState);

  let buffer = [];

  return loading && profile === null ? (
    <Loader />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>{' '}
      {profile !== null ? (
        <Fragment>
          {profile.map((i) => {
            console.log(i);
            if (i.user._id === user._id) {
              buffer.push(user._id);
              return i.website;
            } else {
              return ' ';
            }
          })}
        </Fragment>
      ) : (
        ''
      )}
      {buffer.length === 0 && (
        <Fragment>
          <div>You have not yet setup a profile, please add some info!</div>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
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
