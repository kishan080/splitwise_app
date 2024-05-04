import React, { Component } from 'react'
import LoginForm from './LoginForm'
import { Button, Form } from 'react-bootstrap';
import { Application } from '../../components/export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

export default class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state ={
            display: 'none'
        }
        this.toggleDisplay = this.toggleDisplay.bind(this)

    }

    toggleDisplay(){
        if(this.state.display === "none"){
            this.setState({display: "display"})
        }else{
            this.setState({display: "none"})
        }
    }
    render() {
        return (
            <>
                <Button variant="primary" onClick={this.toggleDisplay}>Sign In</Button>
                <Application.Base display = {this.state.display}>
                    <Application.Close toggleDisplay={this.toggleDisplay}><FontAwesomeIcon icon={faTimes} /></Application.Close>
                    <LoginForm />
                </Application.Base>
            </>
            
        )
    }
}
