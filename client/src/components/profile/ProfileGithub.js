import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getGithubRepos } from '../../actions/profileActions';

const ProfileGithub = ({ username, getGithubRepos, profileState }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {profileState.repos === null ? (
        <Loader />
      ) : (
        profileState.repos.map((i) => (
          <div key={i.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={i.html_url} target='_blank' rel='noopener noreferrer'>
                  {i.name}
                </a>
              </h4>
              {/* <p>{i.description}</p> */}
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  <strong>Stars:</strong> {i.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  <strong>Watchers:</strong> {i.watchers_count}
                </li>
                <li className='badge badge-light'>
                  <strong>Forks:</strong> {i.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profileReducer,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
