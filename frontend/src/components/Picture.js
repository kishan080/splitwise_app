import { Button, Form, Col, Row } from 'react-bootstrap';
import logo from '../images/signup.png'

const React = require('react')

class Picture extends React.Component {
  constructor(props){
    super(props)
    if(props.old){
        this.state = {
            file: props.old
        }
    }else{
        this.state = {
            file: logo
        }
    }
    
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
    this.props.createItem({
        image: event.target.files[0]
    });
  }
  render() {
    return (
      <>
        <img src={this.state.file} style={{width: "50%", height: "50%"}}/>
        <p></p>
        <div className="mb-3">
            <Form.File id="formcheck-api-regular">
            <Form.File.Input onChange={this.handleChange}/>
            </Form.File>
        </div>
      </>
    );
  }
}

export default Picture
