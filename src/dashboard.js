import React, { useState, useEffect } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import { addBudget } from './store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import Budget from './components/budjet';
var apiBaseUrl = 'http://localhost:3000/';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Dashboard = (props) => {

  const classes = useStyles();
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [title, setTitle] = useState('');
  const [cycle, setCycle] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [newBudgetRequested, setNewBudgetRequested] = useState(false);
  const [drawer, setDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const dispatch = useDispatch();

  useEffect(() => {

    if (!user && !token) {
      props.history.push('/login');
    }

    getUserBudget();

  }, [])


  const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        props.history.push('/login');
    }



const closeMessage = (message) => {
        if (message == 'error') {
            setError(false);
        } else {
            setSuccess(false);
        }
    }


  const getUserBudget = () => {
    const payload = {
      'params': {
        'user_id': user._id
      }
    }
    const axiosHeader = {
      headers: {
        'x-access-token': token
      }
    }
    axios.get(apiBaseUrl + 'api/user_budget', Object.assign(payload, axiosHeader)).then(response => {
      if (response.data.result?.length) {
        setNewBudgetRequested(true);
        dispatch(addBudget(response.data.result[0]))

      }
    })
  }

  const hangleBudgetCycle = event => {
    setCycle(event.target.value);
  };

  const CycleRange = Array.from(Array(31).keys()).map(i => 0 + i + 1);


  const createBudget = () => {

    if (title.length > 0 && cycle) {
      const payload = {
        'title': title,
        'cycle': cycle,
        'user': user._id,

      }
      const axiosHeader = {
        headers: {
          'x-access-token': token
        }
      }
      axios.post(apiBaseUrl + 'api/budget', payload, axiosHeader).then(response => {
        if (response.data.status === 'success') {
          setError(false);
          setSuccess(true);
          dispatch(addBudget(response.data.budget))
          setNewBudgetRequested(true);
        }
        else {
          setError(true);
          setErrorMessage(Array.isArray(response.data.message) ? response.data.message[0]['msg'] : response.data.message)
        }
      }).catch(function (error) {
        console.log(error);
      })
    } else {
      setError(true);
      setErrorMessage('please complete all fields!');
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer({ ...drawer , [anchor]: open})
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem onClick={logout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout"></ListItemText>
          </ListItem>
      </List>
    </div>
  );




  return (
    <MuiThemeProvider>
      <div>
        <AppBar position="static" color='transparent' style={{ backgroundColor: 'rgb(0, 188, 212' }}>
          <Toolbar>
            <div className="menuGrid">

              <div className="btnDrawer">
                <IconButton edge="start" color="inherit" aria-label="menu" className="menuItem" onClick={toggleDrawer('right', true)}>
                  <MenuIcon />
                </IconButton>
              </div>


              <Typography variant="h6" className="menuItem">
                Welcome {user.first_name}
              </Typography>


              {/* <Grid item>
                                    <Button style={{ color: 'white' }} onClick={this.logout}>Logout</Button>
                                </Grid> */}
            </div>
          </Toolbar>
        </AppBar>

        <Drawer open={drawer['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>


        {!newBudgetRequested ? <div className="budgetForm">

          <div className="addBudget">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>

          <div style={{ textAlign: 'center' }}>
            <TextField hintText="title" floatingLabelText="title"
              onChange={(event, newValue) => setTitle(newValue)}></TextField>
            <br />


            <FormControl className="form">
              <InputLabel id="cycle">Cycle</InputLabel>
              <Select
                labelId="cycle"
                id="cyle"
                value={cycle}
                // onChange={(event, newValue) => this.setState({ cycle: newValue })}
                onChange={hangleBudgetCycle}

              >
                {
                  CycleRange.map(el => <MenuItem value={el} key={el}> {el} </MenuItem>)
                }

              </Select>

            </FormControl>
          </div>

          <br />

          <RaisedButton label="Submit" primary={true} className="loginStyle"
            onClick={(event) => createBudget(event)} />

        </div> : <Budget/>}

        <br />

        {error ? <Alert onClose={() => { closeMessage('error') }} severity="error">{errorMessage}</Alert> : null}

        {success ? <Alert onClose={() => { closeMessage('success') }} severity="success">Budget created successfully</Alert> : null}
      </div>
    </MuiThemeProvider>

  )


}



export default Dashboard;
