import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';
import { connect } from 'react-redux';

export const Education = ({ education, deleteEducation }) => {
  const educations = education.map((i) => (
    <tr key={i._id}>
      <td>{i.school}</td>
      <td className='hide-sm'>{i.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{i.from}</Moment> -{' '}
        {i.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{i.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteEducation(i._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials </h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
