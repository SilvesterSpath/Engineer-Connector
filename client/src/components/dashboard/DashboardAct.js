import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardAct = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary add'></i> Edit Profile{' '}
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary add'></i> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary add'></i> Add Education
      </Link>
    </div>
  );
};
