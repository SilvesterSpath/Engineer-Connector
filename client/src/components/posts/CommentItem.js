import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/postActions';

const CommentItem = ({ comment, postId, authState, deleteComment }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href={`/profile/user/${comment.user}`}>
          <img className='round-img' src={comment.avatar} alt='' />
          <h4>{comment.name}</h4>
        </a>
      </div>
      <div>
        <p className='my-1'>{comment.text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-danger'
          onClick={(e) => deleteComment(postId, comment._id)}
        >
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authState: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
