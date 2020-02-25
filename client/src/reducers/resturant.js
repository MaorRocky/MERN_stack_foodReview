import {
  GET_RESTURANTS,
  RESTURANT_ERROR,
  ADD_RESTURANT,
  GET_RESTURANT,
  ADD_REVIEW,
  REMOVE_REVIEW,
  SEARCH,
  SEARCH_LOCATION,
  SEARCH_BOTH
} from '../actions/types';

const initialState = {
  resturants: [],
  resturant: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RESTURANTS:
      return {
        ...state,
        resturants: payload,
        loading: false
      };
    case GET_RESTURANT:
      return {
        ...state,
        resturant: payload,
        loading: false
      };
    case ADD_RESTURANT:
      return {
        ...state,
        resturants: [payload, ...state.resturants],
        loading: false
      };

    case RESTURANT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case ADD_REVIEW:
      return {
        ...state,
        resturant: { ...state.resturant, reviews: payload },
        loading: false
      };
    case REMOVE_REVIEW:
      return {
        ...state,
        resturant: {
          ...state.resturant,
          reviews: state.resturant.reviews.filter(
            review => review._id !== payload
          )
        },
        loading: false
      };
    case SEARCH_BOTH:
    case SEARCH_LOCATION:
    case SEARCH:
      console.log(payload);
      return {
        resturants: payload
      };

    default:
      return state;
  }
}
