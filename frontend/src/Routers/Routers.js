import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import Home from '../pages/Home'
import SignupPage from '../pages/userauth/SignupPage'
import LoginPage from '../pages/userauth/LoginPage'
import Profile from '../pages/userauth/Profile'
import Dashboard from '../pages/Dashboard'
import Create from '../pages/Create'
import Expenses from '../pages/Expenses'
import Activity from '../pages/Activity'

class Routers extends Component{
    render(){
        return(
        <Switch>
            <Route exact path = '/'><Home /></Route>
            <Route exact path = '/home'><Home /></Route>
            <Route exact path = '/dashboard'><Dashboard /></Route>
            <Route path = '/signin'><LoginPage /></Route>
            <Route path = '/signup'><SignupPage /></Route>
            <Route path = '/profile'><Profile /></Route>
            <Route path = '/create'><Create /></Route>
            <Route path = '/expenses'><Expenses /></Route>
            <Route path = '/activity'><Activity /></Route>
        </Switch>
    )
    }
}

export default Routers