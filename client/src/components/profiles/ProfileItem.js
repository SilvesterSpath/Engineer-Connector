import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProfileItem({ profile }) {
  return (
    <div className='profile bg-light'>
      <img
        className='round-img'
        src={profile.user.avatar}
        alt={profile.user.name}
      />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}{' '}
          {profile.company && <span> at {profile.company}</span>}
        </p>
        <p className='my-1'>
          {profile.location && <span>{profile.location}</span>}
        </p>
        <Link
          to={`/profile/user/${profile.user._id}`}
          className='btn btn-primary'
        >
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.slice(0, 4).map((i, idx) => (
          <li key={idx} className='skills'>
            <i className='fas fa-check'></i> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
