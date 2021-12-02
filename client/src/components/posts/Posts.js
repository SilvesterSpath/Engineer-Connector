import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import Loader from '../layout/Loader';
import PostForm from './PostForm';
import { getPosts, addPost } from '../../actions/postActions';

const Posts = ({ getPosts, postState: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>
      <PostForm />
      <div className='posts'>
        {posts.length > 0
          ? posts.map((i) => <PostItem key={i._id} post={i} />)
          : 'There is no post'}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postState: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  postState: state.postReducer,
});

export default connect(mapStateToProps, { getPosts, addPost })(Posts);
