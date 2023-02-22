import React, { Component} from 'react';
import {BrowserRouter,Redirect,Switch} from 'react-router-dom';
import { Route } from "react-router-dom";

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import authContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({token: token, userId: userId});

  };

  logout = () => {
    this.setState({token: null, userId: null});
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <authContext.Provider 
        value={{
          token:null, 
          userId: null, 
          login: this.login, 
          logout: this.logout}}>
        <MainNavigation />
        <main className='main'>
          <Switch>
            {!this.state.token && <Redirect from="/" to="/auth" exact></Redirect>}
            {this.state.token && <Redirect from="/" to="/events" exact></Redirect>}
            {this.state.token && <Redirect from="/auth" to="/events" exact></Redirect>}
            {!this.state.token &&<Route path='/' Component={null} />}
            <Route path='/auth' Component={AuthPage} />
            <Route path='/events' Component={EventsPage} />
            {this.state.token &&<Route path='/bookings' Component={BookingsPage} />}
          </Switch> 
        </main>
        </authContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
