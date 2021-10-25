import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ loading, isAuthenticated }) => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> EngConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Engineers</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.poptype = {
  isAuthenticated: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  loading: state.loading,
});

export default connect(mapStateToProps, {})(Navbar);
