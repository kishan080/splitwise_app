import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/signup.png'
import {DB} from '../constants/DB'
import axios from 'axios';
// import {UserContext} from '../contexts/userContext'
//     const {user} = useContext(UserContext)
const React = require('react')

class CreateInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            users: ''
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    async componentDidMount(){
        let Search_URL = `${DB}/searchUser`
        const res = await axios.get(Search_URL)
        this.setState({
            users: res.data.dataset
        })
    }
    
    handleSearch(event){
        event.preventDefault();
        let target = event.target;
        if(target.name === "username"){
            this.setState(
                {username: target.value}
            )
        }
        if(target.name === "email"){
            this.setState(
                {email: target.value}
            )
        }
    }

    render(){
        let user = '';
        let pic = logo
        let name = '';
        let form = <>
                <Col sm={4}>
                    <Form.Control type="text" placeholder="Enter username" onChange={this.handleSearch} value={this.state.username} name="username" data-testid="name-input-box"/>
                    {/* {displayUser} */}
                </Col>
                <Col sm={5}>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.handleSearch} value={this.state.email} name="email"/>
                </Col>
                </>
        if(this.state.users){
            let currentName = localStorage.getItem('authUser')
            let currentEmail = localStorage.getItem('authEmail')
            user = this.state.users.filter(u => (u.username === this.state.username || u.email === this.state.email) && currentName !== u.username && currentEmail !== u.email)
        }
        if(user[0]){
            let currentName = user[0].username
            let currentEmail = user[0].email
            pic = user[0].picture
            name = <div style={{width: "300px"}} data-testid="name-output-box">Added {currentName}({currentEmail})</div>
            form = <Col md="8"></Col>
            this.props.createItem({
                ID: user[0].ID,
                username: user[0].username
            });
        }
        return (
        <>
            <Row>
                <Col sm={1}>
                    <Image src={pic} roundedCircle style={{width: "30px", height: "30px"}}/>
                </Col>
                {name}
                
                {form}
            </Row>
        </>
    );
  }
}

export default CreateInput