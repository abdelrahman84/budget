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
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
var apiBaseUrl = 'http://localhost:3000/';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            title: '',
            cycle: 1,
            error: false,
            errorMessage: '',
            success: false,
            newBudgetRequested: false,

        };
        if (!this.state.user && !this.state.token) {
            this.props.history.push('/login');
        }

        this.logout = this.logout.bind(this);
        this.CycleRange = Array.from(Array(31).keys()).map(i => 0 + i + 1);
    }

    componentWillMount() {
        this.getUserBudget();
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

        if (this.state.title.length > 0 && this.state.cycle) {
            const payload = {
                'title': this.state.title,
                'cycle': this.state.cycle,
                'user': this.state.user._id,

            }
            const axiosHeader = {
                headers: {
                    'x-access-token': this.state.token
                }
            }
            axios.post(apiBaseUrl + 'api/budget', payload, axiosHeader).then(response => {
                if (response.data.status === 'success') {
                    this.setState({ error: false });
                    this.setState({ success: true });
                }
                else {
                    this.setState({ error: true });
                    this.setState({ errorMessage: Array.isArray(response.data.message) ? response.data.message[0]['msg'] : response.data.message })
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            this.setState({ error: true });
            this.setState({ errorMessage: 'please complete all fields!' });
        }
    }

    closeMessage(message) {
        if (message == 'error') {
            this.setState({ error: false });
        } else {
            this.setState({ success: false });
        }
    }

    hangleBudgetCycle = event => {
        this.setState({ cycle: event.target.value });
      };

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

                        <div className="addBudget">
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                        <TextField hintText="title" floatingLabelText="title"
                            onChange={(event, newValue) => this.setState({ title: newValue })}></TextField>
                        <br />


                        <FormControl className="form">
                            <InputLabel id="cycle">Cycle</InputLabel>
                            <Select
                                labelId="cycle"
                                id="cyle"
                                value={this.state.cycle}
                                // onChange={(event, newValue) => this.setState({ cycle: newValue })}
                                onChange={this.hangleBudgetCycle}

                            >
                                {
                                    this.CycleRange.map(el => <MenuItem value={el} key={el}> {el} </MenuItem>)
                                }

                            </Select>

                        </FormControl>
                         </div>

                        <br />

                        <RaisedButton label="Submit" primary={true} className="loginStyle"
                            onClick={(event) => this.createBudget(event)} />

                    </div>

                    <br />

                    {this.state.error ? <Alert onClose={() => { this.closeMessage('error') }} severity="error">{this.state.errorMessage}</Alert> : null}

                    {this.state.success ? <Alert onClose={() => { this.closeMessage('success') }} severity="success">Budget created successfully</Alert> : null}
                </div>
            </MuiThemeProvider>
        )
    }

}


export default Dashboard;