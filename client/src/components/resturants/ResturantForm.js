import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addResturant } from '../../actions/resturant';

const ResturantForm = ({ addResturant }) => {
    const
  return <div></div>;
};

ResturantForm.propTypes = {
  addResturant: PropTypes.func.isRequired
};

export default connect(null, { addResturant })(ResturantForm);
