import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'relative',
    width: '100vw',
    backgroundImage: `url(https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'calc(100vh)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f5f5f5',
    padding: theme.spacing(4),
    borderRadius: '8px',
    zIndex: '1',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    '&::before': {
      /* add the pseudo-element */ content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: '-1',
      backgroundColor: 'rgba(0, 0, 0, 0.5)' /* black with 50% opacity */,
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
    zIndex: '2',
  },
  textWrapper: {
    zIndex: '2',
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/search');
    console.log('Button clicked!');
  };

  return (
    <>
      <div className={classes.hero}>
        <Container maxWidth="md" className={classes.textWrapper}>
          <Typography variant="h1" component="h1" className={classes.title}>
            Discover Artworks and Artifacts from Around the World
          </Typography>
          <Typography variant="h4" component="h2" className={classes.subtitle}>
            Search by location, artist, and characteristics
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={`${classes.button} search-button`}
            onClick={handleButtonClick}
          >
            Search Now
          </Button>
        </Container>
      </div>
    </>
  );
}
