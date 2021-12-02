import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addLike, deletePostById, removeLike } from '../../actions/postActions';

const PostItem = ({ post, authState, addLike, removeLike, deletePostById }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href={`/profile/user/${post.user}`}>
          <img className='round-img' src={post.avatar} alt='' />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <p className='my-1'>{post.text}</p>
        <p className='post-date'>
          Posted on: <Moment format='DD/MM/YYYY'>{post.date}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={(e) => addLike(post._id)}
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          <span>
            {post.likes && post.likes.length > 0 ? post.likes.length : ''}
          </span>
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={(e) => removeLike(post._id)}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/posts/${post._id}`} className='btn btn-primary'>
          Discussion{' '}
          {post.comments && post.comments.length > 0 && (
            <span className='comment-count'> {post.comments.length}</span>
          )}
        </Link>
        {post.user && post.user === authState.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => deletePostById(post._id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePostById,
})(PostItem);
