import React, { Component } from 'react';
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
var apiBaseUrl = 'http://localhost:3000/';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            title: '',
            cycle: '',

        };
        if (!this.state.user && !this.state.token) {
            this.props.history.push('/login');
        }

        this.logout = this.logout.bind(this);
        this.CycleRange = Array.from(Array(31).keys()).map(i => 0+i+1);
    }

    componentWillMount() {
        this.getUserBudget();
        // console.log(this.CycleRange)
    }

    logout() {
        const { history } = this.props;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');
    }

    getUserBudget() {
        const payload = {
            'params': {
                'user_id': this.state.user._id
            }
        }
        const axiosHeader = {
            headers: {
                'x-access-token': this.state.token
            }
        }
        axios.get(apiBaseUrl + 'api/user_budget', Object.assign(payload, axiosHeader)).then(response => {
            //console.log(response.data);
        })
    }



    createBudget() {
        //console.log(this.state.title);
        //console.log(this.state.cycle.props.value);
    }


    render() {
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
                                    Welcome {this.state.user.first_name}
                                </Typography>


                                {/* <Grid item>
                                    <Button style={{ color: 'white' }} onClick={this.logout}>Logout</Button>
                                </Grid> */}
                            </div>
                        </Toolbar>
                    </AppBar>

                    <div className="budgetForm">

                        <div className="formItem">

                            <TextField hintText="Enter budjet title" floatingLabelText="title"
                                onChange={(event, newValue) => this.setState({ title: newValue })}></TextField>

                        </div>

                          <div className="formItem">
                                <InputLabel id="cycle">Cycle</InputLabel>
                                <Select
                                    labelId="cycle"
                                    id="cyle"
                                    value={this.state.cycle}
                                    onChange={(event, newValue) => this.setState({ cycle: newValue })}
                                >
                                   
                                    {
                                       this.CycleRange.map(el => <MenuItem value ={el} key={el}> {el} </MenuItem>) 
                                    }
                                    
                                </Select>
                            </div>
                        <br />

                        <RaisedButton label="Submit" primary={true} className="loginStyle"
                            onClick={(event) => this.createBudget(event)} />





                    </div>



                </div>
            </MuiThemeProvider>
        )
    }

}


export default Dashboard;