import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
            token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
        };
        if (!this.state.user && !this.state.token) {
            this.props.history.push('/login');
        }

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {

    }

    logout() {
        const { history } = this.props;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar position="static" color='transparent' style={{ backgroundColor: 'rgb(0, 188, 212', alignItems: 'center' }}>
                        <Toolbar>
                            <Grid justify="space-between" container spacing={10}>
                                <Grid item>
                                    <Typography variant="h6" style={{ color: 'white' }}>
                                        Welcome {this.state.user.first_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button style={{ color: 'white', float: 'right' }} onClick={this.logout}>Logout</Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        )
    }

}


export default Dashboard;