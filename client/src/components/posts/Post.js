import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import { getPostById } from '../../actions/postActions';

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
          <section className='container'>
            <Link to='/posts' className='btn'>
              Back To Posts
            </Link>
            <div className='post bg-white p-1 my-1'>
              <div>
                <a href='profile.html'>
                  <img className='round-img' src={post.avatar} alt='' />
                  <h4>John Doe</h4>
                </a>
              </div>
              <div>
                <p className='my-1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  possimus corporis sunt necessitatibus! Minus nesciunt soluta
                  suscipit nobis. Amet accusamus distinctio cupiditate
                  blanditiis dolor? Illo perferendis eveniet cum cupiditate
                  aliquam?
                </p>
              </div>
            </div>

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
                <input
                  type='submit'
                  className='btn btn-dark my-1'
                  value='Submit'
                />
              </form>
            </div>

            <div className='comments'>
              <div className='post bg-white p-1 my-1'>
                <div>
                  <a href='profile.html'>
                    <img
                      className='round-img'
                      src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                      alt=''
                    />
                    <h4>John Doe</h4>
                  </a>
                </div>
                <div>
                  <p className='my-1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint possimus corporis sunt necessitatibus! Minus nesciunt
                    soluta suscipit nobis. Amet accusamus distinctio cupiditate
                    blanditiis dolor? Illo perferendis eveniet cum cupiditate
                    aliquam?
                  </p>
                  <p className='post-date'>Posted on 04/16/2019</p>
                </div>
              </div>

              <div className='post bg-white p-1 my-1'>
                <div>
                  <a href='profile.html'>
                    <img
                      className='round-img'
                      src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                      alt=''
                    />
                    <h4>John Doe</h4>
                  </a>
                </div>
                <div>
                  <p className='my-1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint possimus corporis sunt necessitatibus! Minus nesciunt
                    soluta suscipit nobis. Amet accusamus distinctio cupiditate
                    blanditiis dolor? Illo perferendis eveniet cum cupiditate
                    aliquam?
                  </p>
                  <p className='post-date'>Posted on 04/16/2019</p>
                  <button type='button' className='btn btn-danger'>
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
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
