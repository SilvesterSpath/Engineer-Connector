import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Loader from '../layout/Loader';
import { getPosts } from '../../actions/postActions';

const Posts = ({ getPosts, postState: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {' '}
      <section class='container'>
        <h1 class='large text-primary'>Posts</h1>
        <p class='lead'>
          <i class='fas fa-user'></i> Welcome to the community!
        </p>

        <div class='post-form'>
          <div class='bg-primary p'>
            <h3>Say Something...</h3>
          </div>
          <form class='form my-1'>
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Create a post'
              required
            ></textarea>
            <input type='submit' class='btn btn-dark my-1' value='Submit' />
          </form>
        </div>

        <div class='posts'>
          {posts.length > 0
            ? posts.map((i) => (
                <div class='post bg-white p-1 my-1'>
                  <div>
                    <a href='profile.html'>
                      <img class='round-img' src={i.avatar} alt='' />
                      <h4>{i.name}</h4>
                    </a>
                  </div>
                  <div>
                    <p class='my-1'>{i.text}</p>
                    <p class='post-date'>
                      Posted on: <Moment format='DD/MM/YYYY'>{i.data}</Moment>
                    </p>
                    <button type='button' class='btn btn-light'>
                      <i class='fas fa-thumbs-up'></i>
                      <span>4</span>
                    </button>
                    <button type='button' class='btn btn-light'>
                      <i class='fas fa-thumbs-down'></i>
                    </button>
                    <a href='post.html' class='btn btn-primary'>
                      Discussion <span class='comment-count'>2</span>
                    </a>
                    <button type='button' class='btn btn-danger'>
                      <i class='fas fa-times'></i>
                    </button>
                  </div>
                </div>
              ))
            : 'There is no post'}
        </div>
      </section>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  postState: state.postReducer,
});

export default connect(mapStateToProps, { getPosts })(Posts);
