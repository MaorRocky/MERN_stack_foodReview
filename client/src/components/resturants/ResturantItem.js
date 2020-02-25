import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ResturantItem = ({
  auth,
  resturant: { _id, name, text, location, avatar, reviews }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/resturants/${_id}`}>
          <img className='square-img' src={avatar} alt='' />
          <h2>{name}</h2>
          <h4>{location}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <Link to={`/resturants/${_id}`} className='btn btn-primary'>
          Wtite a review! Reviews{' '}
          <span className='comment-count'>{reviews.length}</span>
        </Link>
      </div>
    </div>
  );
};

ResturantItem.propTypes = {
  resturant: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {})(ResturantItem);
