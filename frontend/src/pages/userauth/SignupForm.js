import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {userSignupRequest} from '../../actions/signupActions'

class SignupForm extends Component{
    constructor(props){
        super(props)
        this.state ={
            username: '',
            psswd: '',
            email: '',
            phone: '',
            errors: ''
        }
    }

    static propTypes = {
        userSignupRequest : PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    refreshPage = (e) => {
        window.location.replace("/home");
    }

    onSubmit = (e) => {
        this.setState({error: ''})
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(
            (res)=>{
                if(this.props.msg && this.props.msg.msg)
                    this.setState({errors: this.props.msg})
                // console.log("this.props.msg",this.props.msg);
                if(this.props.msg && this.props.msg.success){
                    // console.log("this.props.msg",this.props.msg);
                    // console.log("this.props.msg.success",this.props.msg.success);
                    setTimeout(this.refreshPage, 1000);
                }
            },
            ({response}) => {
                console.log("fail");
            }
        )
    }

    render(){
        if(this.state.errors){
            alert(this.state.errors.msg)
            this.setState({errors:''})
        }
        return (
        <Form style={{width: "50vw", padding: "4rem"}} onSubmit={this.onSubmit} method="POST">

            <Form.Group controlId="formGridUsername">
                <Form.Label>Hi there! My name is</Form.Label>
                <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={this.onChange} required name="username"/>
                {/* {errors.username && <span>{errors.username}</span>} */}
            </Form.Group>

            <Form.Group controlId="formGridPassword">
                <Form.Label>Here’s my password: </Form.Label>
                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required name="psswd"/>
            </Form.Group>

            <Form.Group controlId="formGridEmail">
                <Form.Label>Here’s my email address: </Form.Label>
                <Form.Control type="email" placeholder="Email 123@gmail.com" value={this.state.email} onChange={this.onChange} required name="email"/>
                {/* {errors.email && <span>{errors.email}</span>} */}
            </Form.Group>

            <Form.Group controlId="formGridPhone">
                <Form.Label>And here’s my phone number: </Form.Label>
                <Form.Control type="tel" placeholder="123-456-7890" value={this.state.phone} onChange={this.onChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name="phone"/>
            </Form.Group>


            <Form.Text className="text-muted">Already had account? <Button variant="link">
                    Sign me in!
            </Button></Form.Text>

            <Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form.Group>
            <h6>By signing up, you accept the Splitwise Terms of Service.</h6>
        </Form>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log("state", state);
    return {
        msg: state.auth.msg
    }
}

export default connect(mapStateToProps, {userSignupRequest})(SignupForm)

