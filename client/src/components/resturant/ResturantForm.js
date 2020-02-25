import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../../actions/resturant';
import { addReview as addReview_profile } from '../../actions/profile';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: 300, // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const ResturantForm = ({ addReview, resturantId }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    bathroom: '',
    staff: '',
    cleanliness: '',
    drive_thru: '',
    delivery: '',
    food: ''
  });
  const { bathroom, staff, cleanliness, drive_thru, delivery, food } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    addReview(resturantId, {
      bathroom,
      cleanliness,
      staff,
      drive_thru,
      delivery,
      food
    });
    addReview_profile();
  };

  return (
    <Container component='main'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Add Review , numbers between 0-5
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='bathroom'
                label='bathroom'
                name='bathroom'
                value={bathroom}
                onChange={e => onChange(e)}
                autoComplete='bathroom'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='staff'
                label='staff'
                type='staff'
                id='staff'
                value={staff}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='cleanliness'
                label='cleanliness'
                type='cleanliness'
                id='cleanliness'
                value={cleanliness}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='drive_thru'
                label='Drive Through'
                type='drive_thru'
                id='drive_thru'
                value={drive_thru}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='delivery'
                label='delivery'
                type='delivery'
                id='delivery'
                value={delivery}
                onChange={e => onChange(e)}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='food'
                label='food'
                type='food'
                id='food'
                value={food}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={e => onSubmit(e)}
          >
            Submit
          </Button>
          <Grid container></Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

ResturantForm.propTypes = {
  addReview: PropTypes.func.isRequired
};

export default connect(null, { addReview })(ResturantForm);
