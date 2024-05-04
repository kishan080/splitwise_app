import React, {useState,useContext, useEffect}from 'react'
import { Button, Form, Col, Row, Image, Dropdown, Jumbotron, Container } from 'react-bootstrap';
import ActivityInput from '../components/ActivityInput'
import Balance from '../components/Balance'
import SingleExpense from '../pages/SingleExpense'
import logo from '../images/signup.png'
import {DB, DB_PIC} from '../constants/DB'
import {ActivityContext} from '../contexts/activityContext'
import {GroupContext} from '../contexts/groupContext'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Application } from '../components/export';
import Picture from '../components/Picture'
import axios from 'axios';

function Expenses(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const [display,setDisplay] = useState("none")
    const [picture,setPicture] = useState()
    const [name,setName] = useState()
    const [change,setChange] = useState()
    const [userInfo, setUserInfo] = useState()

    const {activities} = useContext(ActivityContext)
    const {groups} = useContext(GroupContext)
    
    const leave_URL = `${DB}/reject`
    const update_URL= `${DB}/update`
    
    let pic = `${DB_PIC}/${props.id}/profile.png`
    let expenseList = [];
    
    if(activities && groups){
        if(props.no){
            expenseList.push(<div>{props.no}</div>)
        }else{
            let activity = activities.filter(a=> a.G_ID === props.id)
            activity.map((item, index) => {
                expenseList.push(<ActivityInput value={item} key={index} />)
            });
        }
    }

    expenseList.sort((a, b) => (a.props.value.date > b.props.value.date) ? -1 : 1)
    
    function refreshPage() {
        window.location.reload(false);
    }

    function leave(){
        const calculate_URL = `${DB}/calculate`
        fetch(calculate_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id
            })
        }).then(res => res.json()).then(result=>{
            let user = result.dataset.filter(u=> u.user === localStorage.getItem('authID'))
            if(user[0].total === 0){
                // console.log("leave");
                fetch(leave_URL, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: props.name,
                        member: localStorage.getItem('authID')
                    })
                }).then(res => res.json()).then(result=>{
                    // console.log(result.dataset);
                    setTimeout(refreshPage, 1000)
                })
            }else{
                alert("You should pay off all/get pack all the expenses before you leave the group!")
            }
        })
    }

    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }

    const createItem= async(newItem) => {
        setPicture(newItem.image)
        // console.log("inside createItem");
    }

    async function update(){
        const formData = new FormData();
        formData.append('name', change);
        formData.append('id', props.id);
        formData.append('update', 'update');
        formData.append('upload','group');
        formData.append('picture', picture);
        axios({
            method: "POST",
            url: update_URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log("response", response);
        });
         setTimeout(refreshPage, 1000);
         setDisplay("none")
    }

    // console.log("props name", props.name);
    return (
        <>
        <Col sm={6}>
            <Jumbotron style={{padding: "10px"}}>
                    <Container>
                        <Row>   
                            <Image src={pic ? pic : logo} style={{width: "50px",height: "50px"}} />
                            <h3>{props.name} Expenses</h3>
                            <SingleExpense />
                            <Button variant="secondary" className="ml-3" onClick={leave}>
                                Leave Group
                            </Button>
                        </Row>
                        <Row>
                            <h6>{monthNames[new Date().getMonth()]} {new Date().getFullYear()}</h6>
                        </Row>
                    </Container>
                </Jumbotron>
            <Row>
                {expenseList}
            </Row>
        </Col>
        <Col sm={3}>
            <h4>GROUP BALANCES</h4>
            {props ? <Balance id={props.id} key={Math.random()}/> : <p>Waiting for accpeting invitation...</p>}
            <Button variant="link" className="ml-3" onClick={toggleDisplay}>
                Edit...
            </Button>
        </Col>
        <Application.Group display = {display}>
            <Application.Close toggleDisplay={toggleDisplay}><FontAwesomeIcon icon={faTimes} /></Application.Close>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Picture createItem={createItem} old={pic}/>
                </Col>
                <Col sm={8}>
                    <h4>Change Group Information</h4>
                    <h6>My new group name shall be called...</h6>
                    <Form.Control type="text" placeholder={props.name} onChange={({target}) => setChange(target.value)}/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Button variant="danger" onClick={update}>Save</Button>
            </Row>
        </Application.Group>  
        </>
    )
}

export default Expenses