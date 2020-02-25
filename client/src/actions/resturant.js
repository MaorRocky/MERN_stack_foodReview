import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_RESTURANTS,
  RESTURANT_ERROR,
  ADD_RESTURANT,
  GET_RESTURANT,
  ADD_REVIEW,
  REMOVE_REVIEW
} from './types';

// Get resturants
export const getResturants = () => async dispatch => {
  try {
    const res = await axios.get('/api/resturants');

    dispatch({
      type: GET_RESTURANTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RESTURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add resturant
export const addResturant = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/resturants', formData, config);

    dispatch({
      type: ADD_RESTURANT,
      payload: res.data
    });

    dispatch(setAlert('Resturant Created', 'success'));
  } catch (err) {
    dispatch({
      type: RESTURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get resturant
export const getResturant = id => async dispatch => {
  try {
    const res = await axios.get(`/api/resturants/${id}`);

    dispatch({
      type: GET_RESTURANT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RESTURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add review
export const addReview = (reviewID, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/resturants/review/${reviewID}`,
      formData,
      config
    );

    dispatch({
      type: ADD_REVIEW,
      payload: res.data
    });

    dispatch(setAlert('Review Added', 'success'));
  } catch (err) {
    dispatch({
      type: RESTURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete review
export const deleteReview = (resturantId, reviewId) => async dispatch => {
  try {
    await axios.delete(`/api/resturants/review/${resturantId}/${reviewId}`);

    dispatch({
      type: REMOVE_REVIEW,
      payload: reviewId
    });

    dispatch(setAlert('Review Removed', 'success'));
  } catch (err) {
    dispatch({
      type: RESTURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
