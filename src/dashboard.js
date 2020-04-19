import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
            token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
        };
        if (!this.state.user && !this.state.token) {
            this.props.history.push('/register');
        }
    }

    componentWillMount() {


    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar position="static" color='transparent' style={{ backgroundColor: 'rgb(0, 188, 212', alignItems: 'center' }}>
                        <Toolbar>

                            <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                                Welcome {this.state.user.first_name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        )
    }

}


export default Dashboard;