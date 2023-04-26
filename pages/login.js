import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { favouritesAtom } from '@/store';
import { getHistory, getFavourites } from '@/lib/userData';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import {
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage:
      'url("https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: -1,
    },
  },
  form: {
    maxWidth: '400px',
    minHeight: '600px',
    width: '100%',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom, #f5f5f5, #dcdcdc)',
  },
  formTitle: {
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center',
    color: '#333',
  },
  formText: {
    marginBottom: '16px',
    fontWeight: 'normal',
    fontSize: '16px',
    textAlign: 'center',
    color: '#666',
  },
  formControl: {
    marginBottom: theme.spacing(2),
    '& label.Mui-focused': {
      color: '#0070f3',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0070f3',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#0070f3',
      },
    },
  },
  formButton: {
    marginTop: '16px',
    borderRadius: '4px',
    height: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    background: '#0070f3',
    color: '#fff',
    '&:hover': {
      background: '#005cb2',
    },
  },
  formAlert: {
    marginTop: '16px',
  },
}));

export default function Login(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const router = useRouter();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push('/favourites');
    } catch (err) {
      setWarning(err.message);
    }
  };

  const updateAtoms = async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  };

  return (
    <>
      <div className={classes.root}>
        <Card variant="outlined" className={classes.form}>
          <Typography variant="h5" component="h2" className={classes.formTitle}>
            Login
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            className={classes.formText}
          >
            Enter your login information below:
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              margin="normal"
              className={classes.formControl}
            >
              <InputLabel htmlFor="userName">User</InputLabel>
              <Input
                id="userName"
                name="userName"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoFocus
                required
                autoComplete="username"
                inputProps={{ 'aria-label': 'user name' }}
              />
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              className={classes.formControl}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                inputProps={{ 'aria-label': 'password' }}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.formButton}
            >
              Login
            </Button>
            {warning && (
              <Alert severity="error" className={classes.formAlert}>
                {warning}
              </Alert>
            )}
          </form>
        </Card>
      </div>
    </>
  );
}
