import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import logo from '../../images/signup.png'
import {DB} from '../../constants/DB'
import { useHistory } from 'react-router-dom';
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import {userSignupRequest} from '../../actions/signupActions'
import PropTypes from 'prop-types'

class SignupPage extends Component {
    static propTypes = {
        userSignupRequest : PropTypes.func.isRequired
    }
    
    render(){
        // console.log();
        return (
            <Row>
            <Col>
                <img src={logo} style={{width: "50%", margin: "auto", display: "block", marginTop: "100px"}}/>
            </Col>
            <Col>
                <SignupForm userSignupRequest={this.props.userSignupRequest}/>
            </Col>
        </Row>
        )
    }
}

export default connect(null, {userSignupRequest})(SignupPage);