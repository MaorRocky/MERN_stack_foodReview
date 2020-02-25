import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Street food review</h1>
          <p className='lead'>Share reviews with other street food lovers!</p>

          <ButtonGroup variant='contained' color='primary' size='large'>
            <Button href='/register'>Sign Up </Button>
            <Button href='/login'>Login</Button>
          </ButtonGroup>

          {/* <div class='buttons'>
            <Link to='/register' class='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' class='btn btn-light'>
              Login
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
