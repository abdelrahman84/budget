import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './login';
import Register from './register';

class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          loginScreen: [],
          loginMessage: '',
          buttonLabel : 'Register',
          isLogin: true,
      }
    }

  componentWillMount() {
      var loginScreen = [];
      loginScreen.push(<Login parentContext={this} appContext = {this.props.parentContext} key={'LoginScreen'}/>);
      var loginMessage = 'Not registered yet. Register now';
      this.setState({
          loginScreen: loginScreen,
          loginMessage: loginMessage,
      });
  }

  loginScreenSubmit(event) {
    var loginMessage;
    if (this.state.isLogin) {
        var loginScreen = [];
        loginScreen.push(<Register parentContext={this} appContext={this.props.appContext} key='registerScreen' />);
        loginMessage = 'Already registered. Go to Login';
        this.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage,
            buttonLabel: 'Login',
            isLogin: false
        })
    } else {
        let loginScreen = [];
        loginScreen.push(<Login parentContext={this} appContext={this.props.appContext} />);
        loginMessage = 'Not registered yet. Go to registration';
        this.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage,
            buttonLabel: 'Register',
            isLogin: true
        });
    }
}
  
  render() {
      return (
          <div className = "loginScreen" key="loginScreen">
              {this.state.loginScreen}
          <div>
              {this.state.loginMessage}
            <MuiThemeProvider>
            <div>
             <RaisedButton label={this.state.buttonLabel} primary={true} style={buttonStyle}
             onClick={(event) => this.loginScreenSubmit(event)}/>
             </div>
             </MuiThemeProvider>  
            </div>
            </div>    

      );
  }

 
}

const buttonStyle = {
    margin: 15,
}

export default LoginScreen;