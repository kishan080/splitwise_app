import { Modal, Button, Form, InputGroup, FormControl,Row } from 'react-bootstrap';
import { faFlag, faList, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import logo from '../../images/signup.png'
import Create from '../Create'
import {DB} from '../../constants/DB'
import {Application} from '../../components/export'

const React = require('react')

class DashNav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            groups: '',
            currentGroup: '',
            show: false,
            item: '',
            found: '',
            allGroups: ''
        }
        this.getGroup = this.getGroup.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleAccept = this.handleAccept.bind(this)
        this.handlReject = this.handlReject.bind(this)
        this.search = this.search.bind(this)
        this.recent = this.recent.bind(this)
    }
    
    componentDidMount(){
        let group_URL = `${DB}/getGroup`
        // const expense = '/expense'
        fetch(group_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: localStorage.getItem('authID')
            })
        }).then(res => res.json()).then(result=>{
            // console.log("result.dataset: ", result.dataset);
            this.setState({
                allGroups: result.dataset,
                groups: result.dataset
            })
        })
    }
    getGroup(event) {
        let text = event.target.innerText;
        let currentGroup = this.state.allGroups.filter((g) => g.name === text)
        this.props.createItem({
            ID: currentGroup[0].id,
            allGroup: this.state.allGroups,
            name: currentGroup[0].name,
            recent: ''
        });
        // console.log("inside getGroup", currentGroup[0].id);
    }   

    handleAccept(e){
        // console.log(e.target.id);
        // console.log("accpet this invitation");
        let accept_URL = `${DB}/accpet`
        fetch(accept_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.id,
                user: parseInt(localStorage.getItem('authID'))
            })
        }).then(res => res.json()).then(result=>{
            // console.log("result.dataset: ", result.dataset);
            if(result.success){
                alert("Accept invitation from ", e.target.id)
                window.location.reload(false);
            }
        })
        this.setState({show: false})
    }

    handlReject(e){
        // console.log(e.target.id);
        // console.log("reject this invitation");
        let accept_URL = `${DB}/reject`
        fetch(accept_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.id,
                member: parseInt(localStorage.getItem('authID'))
            })
        }).then(res => res.json()).then(result=>{
            // console.log("result.dataset: ", result.dataset);
            if(result.success){
                alert("Reject invitation from ", e.target.id)
                window.location.reload(false);
            }
        })
        this.setState({show: false})
    }

    handleClose () {
        this.setState({show:false})
    }

    search = async(newItem) => {
        let searchGroup = []
        searchGroup = this.state.allGroups.filter(g => g.name === newItem.value)
        // console.log("searchGroup", searchGroup);
        if(searchGroup.length > 0)
            this.setState({groups: searchGroup, found: 'found'})
        if(newItem.value===""){
            this.setState({groups: this.state.allGroups, found: 'found'})
            // console.log("here");
        }
        // console.log("this.state.groups", this.state.groups);
    }
    
    recent(){
        this.props.createItem({
            recent: "recent",
            id: ''
        });
    }
    
    render(){
        let displayGroup = this.state.groups ? this.state.groups.map((item, index) => 
        item.invitation === 1 ?
        <li className="list-group-item" key={index}>
        <Button variant="link" style={{padding: "0px"}} onClick={this.getGroup}><FontAwesomeIcon icon={faTag} /><strong>{item.name}</strong></Button>
        </li> : null) 
        : 
        null
        let invitation =[]
        let itemList = []
        let count = 0
        invitation = this.state.groups ? 
            <>
        <Modal show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Invitation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "300px" }}>
                {
                this.state.groups.forEach((item, index) => {
                    if(item.invitation!==1 && parseInt(item.rejection)===0){
                        this.state.show = true
                        itemList.push(
                            <>
                            <Row key={index}>
                                <h5>Having a invitation from "{item.name}"</h5>
                                <Button variant="success" id={item.name} onClick={this.handleAccept}>accpet</Button >
                                <Button variant="danger" className="ml-3" id={item.name} onClick={this.handlReject}>reject</Button >
                            </Row>
                            <p></p>
                            </>
                        )
                    }else{
                        count +=1;
                    }
                })
                }
                {count === this.state.groups.length ? <h5>There are no new invitation</h5> : null}
                {itemList}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
            </> : null;

        return (
        <>
        <ul className="list-group list-group-flush">
            <li className="list-group-item" key={Math.random()}><a href="/dashboard"><img src={logo} style={{width: "30px"}}/><strong style={{color: "green"}}>Dashboard</strong></a></li>
            <li className="list-group-item" key={Math.random()}><Button variant="link" onClick={this.recent}><FontAwesomeIcon icon={faFlag} /><strong> Recent activity</strong></Button></li>
            <Create search={this.search}/>
            {displayGroup && displayGroup.length > 0 ? displayGroup : this.state.found}
            {invitation}
        </ul>
        </>
    );
  }
}

export default DashNav