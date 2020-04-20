import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
var apiBaseUrl = 'http://localhost:3000/';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: '',
        }
        this.goToRegistration = this.goToRegistration.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar position="static" color='transparent' style={{ backgroundColor: 'rgb(0, 188, 212', alignItems: 'center' }}>
                        <Toolbar>

                            <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                                Login
                           </Typography>
                        </Toolbar>
                    </AppBar>
                    <div style={{ textAlign: 'center' }}>
                        <TextField hintText="Enter your email" floatingLabelText="email" type="email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}></TextField>
                        <br />

                        <TextField type="password" hintText="Enter your Password" floatingLabelText="password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}></TextField>
                        <br />

                        <RaisedButton label="Submit" primary={true} style={loginStyle}
                            onClick={(event) => this.submitLogin(event)} />

                        {this.state.error ? <Alert onClose={() => { this.closeError() }} severity="error">{this.state.errorMessage}</Alert> : null}

                        <br />


                        <br />
                        <p>Don't have an account?</p>
                        <RaisedButton label="Register" primary={true} style={loginStyle}
                            onClick={this.goToRegistration} />
                    </div>

                </div>

            </MuiThemeProvider>
        )
    }

    goToRegistration() {
        const { history } = this.props;
        history.push('/register');
    }

    closeError() {
        this.setState({ error: false });
    }

    submitLogin(event) {
        const { history } = this.props;
        if (this.state.email.length > 0 && this.state.password.length > 0) {
            var payload = {
                "email": this.state.email,
                "password": this.state.password,
            }
            axios.post(apiBaseUrl + 'login', payload).then(response => {
                if (response.data.status === 'success') {
                    this.setState({ error: false });
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    history.push('/')
                }
                else if (response.data.status === 'error') {
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
}



const loginStyle = {
    margin: 15,
};

export default Login;