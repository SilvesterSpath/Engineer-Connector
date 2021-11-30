import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/profileActions';

const Profile = ({
  getProfileById,
  profileState: { profile, loading },
  authState,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {authState.isAuthenticated &&
            authState.loading === false &&
            authState.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((i) => (
                    <ProfileExperience key={i._id} experience={i} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((i) => (
                    <ProfileEducation key={i._id} education={i} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profileReducer,
  authState: state.authReducer,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
