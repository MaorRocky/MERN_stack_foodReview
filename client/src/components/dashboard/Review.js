import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
// import { deleteReview } from '../../actions/profile';
import { deleteReview } from '../../actions/resturant';

const Review = ({ review, deleteReview }) => {
  const reviews = review.map(rev => (
    <tr key={rev._id}>
      <td className='hide-sm'>{rev.name}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(rev.date)}</Moment> -{' '}
      </td>
      <td>
        <button
          onClick={() => {
            deleteReview(rev._id);
            // deletFromRest(rev._id);
          }}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>My Reviews </h2>
      <table className='table'>
        <tbody>{reviews}</tbody>
      </table>
    </Fragment>
  );
};

Review.propTypes = {
  review: PropTypes.array.isRequired,
  deleteReview: PropTypes.func.isRequired
};

export default connect(null, { deleteReview })(Review);
