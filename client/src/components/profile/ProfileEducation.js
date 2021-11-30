import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileEducation = ({ education }) => {
  return (
    <div>
      <h3 className='text-dark'>{education.school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{education.from}</Moment> -{' '}
        {education.current ? (
          'Current'
        ) : (
          <Moment format='YYYY/MM/DD'>{education.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {education.degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {education.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {education.description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
