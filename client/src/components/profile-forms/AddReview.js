import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../../actions/profile';

const AddReview = ({ addReview, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    date: ''
  });

  const { title, body, date } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add a review</h1>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addReview(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* body'
            name='body'
            value={body}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Date</h4>
          <input
            type='date'
            name='date'
            value={date}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired
};

export default connect(null, { addReview })(withRouter(AddReview));
