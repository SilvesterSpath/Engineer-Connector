import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileExperience = ({ experience }) => {
  return (
    <div>
      <h3 class='text-dark'>{experience.company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{experience.from}</Moment> -{' '}
        {experience.current ? (
          'Current'
        ) : (
          <Moment format='YYYY/MM/DD'>{experience.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {experience.title}
      </p>
      <p>
        <strong>Description: </strong>
        {experience.description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
