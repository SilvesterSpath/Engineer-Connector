import React from 'react';

const Profiles = () => {
  return (
    <div>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        developers
      </p>
      <div className='profiles'>
        <div className='profile bg-light'>
          <img
            className='round-img'
            src='https://www.gravatar.com/avatar/5991c864c47cacd84dba0de95f7eee0f?s=200&r=pg&d=mm'
            alt=''
          />
          <div>
            <h2>John Doe</h2>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <a href='profile.html' className='btn btn-primary'>
              View Profile
            </a>
          </div>

          <ul>
            <li className='text-primary'>
              <i className='fas fa-check'></i> HTML
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> CSS
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> JavaScript
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Python
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> C#
            </li>
          </ul>
        </div>

        <div className='profile bg-light'>
          <img
            className='round-img'
            src='https://www.gravatar.com/avatar/5991c864c47cacd84dba0de95f7eee0f?s=200&r=pg&d=mm'
            alt=''
          />
          <div>
            <h2>John Doe</h2>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <a href='profile.html' className='btn btn-primary'>
              View Profile
            </a>
          </div>

          <ul>
            <li className='text-primary'>
              <i className='fas fa-check'></i> HTML
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> CSS
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> JavaScript
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
