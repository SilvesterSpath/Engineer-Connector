import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import { getPostById } from '../../actions/postActions';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Post = ({ postState: { post, loading }, match, getPostById }) => {
  console.log(match);
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);

  if (post) {
    console.log(post);
  }
  return (
    <Fragment>
      {post === null || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Link to='/posts' className='btn'>
            Back To Posts
          </Link>
          <div className='post bg-white p-1 my-1'>
            <div>
              <a href='profile.html'>
                <img className='round-img' src={post.avatar} alt='' />
                <h4>{post.name}</h4>
              </a>
            </div>
            <div>
              <p className='my-1'>{post.text}</p>
            </div>
          </div>
          <CommentForm postId={post._id} />

          <div className='comments'>
            {post &&
              post.comments &&
              post.comments.map((i) => (
                <CommentItem key={i._id} comment={i} postId={post._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  postState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  postState: state.postReducer,
});

export default connect(mapStateToProps, { getPostById })(Post);
