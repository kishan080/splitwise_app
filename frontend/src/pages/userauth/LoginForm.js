import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login} from '../../actions/loginActions.js'

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            psswd: '',
            errors: {},
            userInfo: ''
        }
    }
    
    static propTypes = {
        login : PropTypes.func.isRequired
    }

    

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        this.setState({error: {}})
        e.preventDefault();
        this.props.login(this.state).then(
            (res) => setTimeout(window.location.reload(false), 5000),
            ({response}) => {
                if(response.status===401)
                    alert(response.data.errors.form)
                if(response.status===200)
                    window.location.replace("/dashboard");
            }
        )
    }
    render() {
        const {errors} = this.state
        if(errors.form){
            alert(errors.form)
        }
        return (
            <Form onSubmit={this.onSubmit} method="POST">
                <Form.Group controlId="formGridEmailLogin">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" placeholder="Email 123@gmail.com" value={this.state.email} onChange={this.onChange} required name="email"/>
                </Form.Group>
                <Form.Text className="text-muted">
                We'll never share your info with anyone else.
                </Form.Text>

                <Form.Group controlId="formGridPasswordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required name="psswd"/>
                </Form.Group>
                <Form.Text className="text-muted">Haven't have account? 
                    <Button variant="link">
                            Sign me in!
                    </Button>
                </Form.Text>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
export default  connect(null, {login})(LoginForm)