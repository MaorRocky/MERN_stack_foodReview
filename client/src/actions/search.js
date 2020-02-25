import axios from 'axios';
import {
  SEARCH,
  SEARCH_LOCATION,
  SEARCH_BOTH,
  SEARCH_ERROR,
  GET_RESTURANTS,
  RESTURANT_ERROR
} from './types';
// Get profile by ID
export const search = name => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (name !== '') {
    try {
      const res = await axios.post(`/api/search`, { name: name }, config);
      console.log('res is\n', res);
      dispatch({
        type: SEARCH_LOCATION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SEARCH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  } else {
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
  }
};
export const search_location_func = location => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (location !== '') {
    try {
      const res = await axios.post(
        `/api/search/location`,
        { location: location },
        config
      );
      console.log('res is\n', res);
      dispatch({
        type: SEARCH,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SEARCH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  } else {
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
  }
};
export const search_both = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/search/location`,
      { name: formData.search_name, location: formData.search_location },
      config
    );
    console.log('res is\n', res);
    dispatch({
      type: SEARCH_BOTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const search_user_name = name => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/search/location`,
      { name: name },
      config
    );
    console.log('res is\n', res);
    dispatch({
      type: SEARCH_BOTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
