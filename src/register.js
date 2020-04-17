import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './login';


var apiBaseUrl = 'http://localhost:3000/';

class Register extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            error: false,
        }
    }
    componentWillReceiveProps(nextPops) {
        console.log('nextProps', nextPops);
    }

    register(event) {
        var self = this;
        if (this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email.length > 0 && this.state.username.length > 0 && this.state.password.length > 0) {
            var payload = {
                'first_name': this.state.first_name,
                'last_name': this.state.last_name,
                'email': this.state.email,
                "username": this.state.username,
                "password": this.state.password,
            }
            axios.post(apiBaseUrl + 'register', payload).then(function (response) {
                console.log(response);
                if (response.data.status !== 'error') {
                    console.log('Registration successful');
                    localStorage.setItem('token', response.data.token)
                    var loginScreen = [];
                    loginScreen.push(<Login parentContext={this} appContext={self.props.appContext} />);
                    var loginMessage = 'Not registered yet. Go to registration';
                    self.props.parentContext.setState({ loginScreen: loginScreen, loginMessage: loginMessage, buttonLabel: 'Register', isLogin: true });
                } else {
                    console.log('error', response.data)
                }
            }).catch(function (error) {
                console.log(error);
            })
        }

        else {
            console.log('input is missing');
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar position="static" color='transparent' style={{backgroundColor: 'rgb(0, 188, 212', alignItems: 'center'}}>
                        <Toolbar>
        
                            <Typography variant="h6" style={{color: 'white', textAlign: 'center'}}>
                                Register
                           </Typography>
                        </Toolbar>
                    </AppBar>

                    <TextField hintText="Enter your first name" floatingLabelText="first name"
                        onChange={(event, newValue) => this.setState({ first_name: newValue })}></TextField>
                    <br />

                    <TextField hintText="Enter your last name" floatingLabelText="last name"
                        onChange={(event, newValue) => this.setState({ last_name: newValue })}></TextField>
                    <br />

                    <TextField hintText="Enter your email" floatingLabelText="email" type="email"
                        onChange={(event, newValue) => this.setState({ email: newValue })}></TextField>
                    <br />

                    <TextField hintText="Enter your username" floatingLabelText="username"
                        onChange={(event, newValue) => this.setState({ username: newValue })}></TextField>
                    <br />

                    <TextField type="password" hintText="Enter your Password" floatingLabelText="password"
                        onChange={(event, newValue) => this.setState({ password: newValue })}></TextField>
                    <br />

                    <RaisedButton label="Submit" primary={true} style={loginStyle}
                        onClick={(event) => this.register(event)} />
                </div>
            </MuiThemeProvider>
        )
    }

}


const loginStyle = {
    margin: 15,
};




export default Register;