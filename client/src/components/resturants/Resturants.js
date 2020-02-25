import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ResturantItem from './ResturantItem';
import { getResturants } from '../../actions/resturant';
import {
  search,
  search_location_func,
  search_both
} from '../../actions/search';
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

const Resturants = ({
  getResturants,
  search,
  search_location_func,
  search_both,
  resturant: { resturants, loading }
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    search_name: '',
    search_location: ''
  });
  const { search_name, search_location } = formData;
  useEffect(() => {
    getResturants();
  }, [getResturants]);
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (search_name !== '' && search_location === '') {
      search(search_name);
    } else if (search_name === '' && search_location !== '') {
      search_location_func(search_location);
    } else if (search_name !== '' && search_location !== '') {
      search_both(formData);
    } else {
      getResturants();
    }

    console.log(resturants);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Search restaurant by name
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
                  Search
                </Button>
              </form>
            </Grid>
            <Typography component='h1' variant='h5'>
              Search restaurant by location
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
                  Search
                </Button>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                  onClick={e => onSubmit(e)}
                >
                  Search Both
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>

        <Box mt={8}></Box>
      </Container>{' '}
      <h1 className='large text-primary'>Restaurants</h1>
      <p className='lead'>Start reviewing....</p>
      <div className='resturants'>
        {resturants.map(resturant => (
          <ResturantItem key={resturant._id} resturant={resturant} />
        ))}
      </div>
    </Fragment>
  );
};

Resturants.propTypes = {
  getResturants: PropTypes.func.isRequired,
  resturant: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  search_location_func: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  resturant: state.resturant
});

export default connect(mapStateToProps, {
  getResturants,
  search,
  search_location_func,
  search_both
})(Resturants);
