import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
var apiBaseUrl = 'http://localhost:3000/';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
   render() {
       return (
           <MuiThemeProvider>
               <div>
               <AppBar position="static" color='transparent' style={{backgroundColor: 'rgb(0, 188, 212', alignItems: 'center'}}>
                        <Toolbar>
        
                            <Typography variant="h6" style={{color: 'white', textAlign: 'center'}}>
                                Login
                           </Typography>
                        </Toolbar>
                    </AppBar>
                   <TextField hintText = "Enter your username" floatingLabelText = "username"
                   onChange = {(event, newValue) => this.setState({username: newValue})}></TextField>
                   <br/>

                   <TextField type = "password" hintText = "Enter your Password" floatingLabelText = "password"
                   onChange = {(event, newValue) => this.setState({password: newValue})}></TextField>
                   <br/>

                   <RaisedButton label = "Submit" primary = {true} style = {loginStyle}
                   onClick = {(event) => this.submitLogin(event)}/>                 
               </div>
           </MuiThemeProvider>
       )
   } 

   submitLogin(event) {
    var self = this;
    var payload = {
        "username": this.state.username,
        "password": this.state.password,
    }
    axios.post(apiBaseUrl+'login', payload).then(function (response) {
        console.log(response);
       if (response.data.code === 200) {
        console.log('Login successful');
        // var uploadScreen = [];
        // uploadScreen.push(<UploadScreen appContext = {self.props.appContext}/>)
        // self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})
       }
       else if (response.data.code === 204) {
         console.log('user name or password don`t match') 
       }
       else {
        console.log('username doesn`t exist');
       }  
    }).catch(function (error) {
       console.log(error);
    })
   }
}



const loginStyle = {
    margin: 15,
};

export default Login;