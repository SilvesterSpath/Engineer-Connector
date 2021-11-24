import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getAllProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

function Profiles({ getAllProfiles, profileState: { profiles, loading } }) {
  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Engineers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            Engineers all over the World!
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((i) => <ProfileItem key={i._id} profile={i} />)
            ) : (
              <h4>No profiles found..</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profileReducer,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
