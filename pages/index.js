import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'relative' /* add this to make the pseudo-element work */,
    backgroundImage: `url(https://images.unsplash.com/photo-1572953109213-3be62398eb95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f5f5f5' /* a lighter shade of white */,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
    },
  },

  title: {
    fontWeight: 'bold',
    fontSize: '48px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px',
    },
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  button: {
    borderRadius: '4px',
    height: '48px',
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.hero}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" className={classes.title}>
            Discover Artworks and Artifacts from Around the World
          </Typography>
          <Typography variant="h4" component="h2" className={classes.subtitle}>
            Search by location, time period, and characteristics
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            href="/search"
          >
            Search Now
          </Button>
        </Container>
      </div>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* Add more content here, such as featured artworks or artifacts */}
        </Grid>
      </Container>
    </>
  );
}
