import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteReview } from '../../actions/resturant';

const ReviewItem = ({
  resturantId,
  review: {
    _id,
    review: { bathroom, staff, cleanliness, drive_thru, delivery, food },
    name,
    avatar,
    user,
    date
  },
  auth,
  deleteReview
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>Bathroom: {bathroom}</p>
      <p className='my-1'>Staff: {staff}</p>
      <p className='my-1'>Cleanliness: {cleanliness}</p>
      <p className='my-1'>Drive through: {drive_thru}</p>
      <p className='my-1'>Delivery: {delivery}</p>
      <p className='my-1'>Food: {food}</p>
      <p className='post-date'>
        Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteReview(resturantId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
);

ReviewItem.propTypes = {
  resturantId: PropTypes.number.isRequired,
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deleteReview })(ReviewItem);
