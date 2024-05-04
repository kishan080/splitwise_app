import React, {Component} from 'react'
import { Navbar, Button, Nav, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../../actions/loginActions'

class LoginNav extends Component {
    constructor(props){
        super(props)
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    logout = (e) => {
        e.preventDefault()
        this.props.logout()
        window.location.replace("/home");
    }

    profile = (e) => {
        window.location.replace("/profile");
    }

    render() {
        // console.log("this.props.auth", this.props.auth);
        return (
        <>
        <Navbar>
            <Navbar.Brand href="/home" style={{color: "black"}} className="col-md-9 col-sm-6">
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
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <NavDropdown title={this.props.auth.user.username} id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1" onClick={this.profile}>Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4" onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
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

export default connect(mapStateToProps, {logout})(LoginNav)