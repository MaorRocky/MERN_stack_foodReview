import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfieReview = ({
  review: {
    review: { bathroom, staff, cleanliness, drive_thru, delivery, food },
    name,
    date
  }
}) => (
  <div>
    <h3 className='text-dark'>Resturant name: {name}</h3>
    <p>
      <Moment format='DD/MM/YYYY'>{moment.utc(date)}</Moment> -{' '}
    </p>
    <p>bathroom : {bathroom}</p>
    <p>staff: {staff}</p>
    <p>cleanliness: {cleanliness}</p>
    <p>drive_thru: {drive_thru}</p>
    <p>delivery: {delivery}</p>
    <p>food: {food}</p>
  </div>
);

ProfieReview.propTypes = {
  review: PropTypes.object.isRequired
};

export default ProfieReview;
