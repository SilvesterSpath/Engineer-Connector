import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export const Experience = ({ experience }) => {
  const experiences = experience.map((i) => (
    <tr key={i._id}>
      <td>{i.company}</td>
      <td className='hide-sm'>{i.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{i.from}</Moment> -{' '}
        {i.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{i.to}</Moment>}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials </h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
