import React, {Component} from 'react'
import { Navbar, Button } from 'react-bootstrap';
import LoginPage from '../pages/userauth/LoginPage'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import LoginNav from '../pages/userauth/LoginNav'

class Header extends Component {
    
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render(){
        const {isAuthenticated} = this.props.auth

        // console.log("isAuthenticated", isAuthenticated);
        const signinLink = (
            <Navbar bg="light" variant="dark">
            <Navbar.Brand href="#home" style={{color: "black"}} className="col-md-9 col-sm-6">
            <img
                alt=""
                src="../logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Splitwise
            {' '}
            </Navbar.Brand>
            <div className="col-md-3 col-sm-6">
                <Button variant="link"><a href="/signup">Sign up</a></Button>
                <LoginPage />
            </div>
        </Navbar>
        )

        const signoutLink = (
            <LoginNav />
        )

        return (
        <>
        {isAuthenticated ? signoutLink : signinLink }
        </>
    )
    }
}

const mapStateToProps = (state) => {
    // console.log("state", state);
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header)