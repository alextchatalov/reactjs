import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import { isAuthenticated } from "../services/auth";
//FAKE AUTH
import { isAuthenticated } from "../components/auth";
import  Login  from '../pages/login/login';
import HomePage from '../pages/home/homePage';
import Configuration from './Configuration'
import Rebalance from './../components/rebalance/Rebalance';
import Wallet from './../components/wallet/Wallet'

const PrivateRoute  = ({ component: Component, ...rest  }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location} }} />
        )
    )}/>
);

const Routes = () => (
   <BrowserRouter>
    <Switch>
        <Route exact path="/" component={() => <HomePage /> }/>
        <PrivateRoute path="/app" component={ () => <h1>Você está Logado</h1>}/>
        <PrivateRoute path="/home" component={ () => <HomePage />}/>
        <PrivateRoute path="/configuration" component={ () => <Configuration />}/>
        <PrivateRoute path="/rebalance" component={ () => <Rebalance />}/>
        <PrivateRoute path="/wallet" component={ () => <Wallet />}/>
        <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>     
   </BrowserRouter> 
);

export default Routes;
