import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

const CommentForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1'>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(CommentForm);
