import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import {
  getProfiles,
  search_profile_name,
  search_profile_location
} from '../../actions/profile';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 800
    }
  }
}));
const Profiles = ({
  getProfiles,
  search_profile_name,
  search_profile_location,
  profile: { profiles, loading }
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    search_name: '',
    search_location: ''
  });
  const { search_name, search_location } = formData;
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (search_name !== '' && search_location === '') {
      search_profile_name(search_name);
    } else if (search_name === '' && search_location !== '') {
      search_profile_location(search_location);
    } else if (search_name === '' && search_location === '') {
      getProfiles();
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Search user profile by name
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='search_name'
                      label='Search'
                      name='search_name'
                      value={search_name}
                      onChange={e => onChange(e)}
                      autoComplete='search_name'
                      autoFocus
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={classes.submit}
                      onClick={e => onSubmit(e)}
                    >
                      Search by name
                    </Button>
                  </form>
                </Grid>
                <Typography component='h1' variant='h5'>
                  Search user profile by location
                </Typography>
                <Grid item xs={12}>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='search_location'
                      label='Search'
                      name='search_location'
                      value={search_location}
                      onChange={e => onChange(e)}
                      autoComplete='search_location'
                      autoFocus
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={classes.submit}
                      onClick={e => onSubmit(e)}
                    >
                      Search by location
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </div>

            <Box mt={8}></Box>
          </Container>{' '}
          <h1 className='large text-primary'>Reviewers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse other reviewers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  search_profile_location: PropTypes.func.isRequired,
  search_profile_name: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfiles,
  search_profile_location,
  search_profile_name
})(Profiles);
