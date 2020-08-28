import React, { Component, useState, useEffect } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
var apiBaseUrl = 'http://localhost:3000/';

const Dashboard = (props) => {

  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [title, setTitle] = useState('');
  const [cycle, setCycle] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [newBudgetRequested, setNewBudgetRequested] = useState(false);

  useEffect(() => {

    if (!user && !token) {
      props.history.push('/login');
    }

    getUserBudget();

  })


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
      console.log(response.data);
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



  return (
    <MuiThemeProvider>
      <div>
        <AppBar position="static" color='transparent' style={{ backgroundColor: 'rgb(0, 188, 212' }}>
          <Toolbar>
            <div className="menuGrid">

              <div className="btnDrawer">
                <IconButton edge="start" color="inherit" aria-label="menu" className="menuItem">
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


        <div className="budgetForm">

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

        </div>

        <br />

        {error ? <Alert onClose={() => { closeMessage('error') }} severity="error">{errorMessage}</Alert> : null}

        {success ? <Alert onClose={() => { closeMessage('success') }} severity="success">Budget created successfully</Alert> : null}
      </div>
    </MuiThemeProvider>

  )


}



export default Dashboard;