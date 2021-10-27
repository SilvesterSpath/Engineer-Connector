import React, { Fragment } from 'react';
import loader from './loading.gif';

function Loader() {
  return (
    <Fragment>
      <img
        src={loader}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
}

export default Loader;
