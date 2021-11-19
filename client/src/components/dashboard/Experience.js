import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Experience = ({ experience }) => {
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials </h2>
      <table className='table'></table>
    </Fragment>
  );
};

Experience.propTypes = {};

export default Experience;
