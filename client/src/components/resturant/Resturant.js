import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ResturantItem from '../resturants/ResturantItem';
import ReviewItem from './ReviewItem';
import { getResturant } from '../../actions/resturant';
import ResturantForm from './ResturantForm';

const Resturant = ({
  getResturant,
  resturant: { resturant, loading },
  match
}) => {
  useEffect(() => {
    getResturant(match.params.id);
  }, [getResturant]);
  return resturant === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/resturants' className='btn'>
        Back to restaurants
      </Link>
      <ResturantItem resturant={resturant} />
      <ResturantForm resturantId={resturant._id} />
      <div className='comments'>
        {resturant.reviews.map(review => (
          <ReviewItem
            key={review._id}
            review={review}
            resturantId={resturant._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Resturant.propTypes = {
  getResturant: PropTypes.func.isRequired,
  resurant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  resturant: state.resturant
});

export default connect(mapStateToProps, { getResturant })(Resturant);
