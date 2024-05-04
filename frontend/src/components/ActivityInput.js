import React, {useContext, useEffect} from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/signup.png'
import category1 from '../images/shopping.png'
import category2 from '../images/daliy.png'
import category3 from '../images/form.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../contexts/userContext'
import { GroupContext } from '../contexts/groupContext'

function ActivityInput(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const {user} = useContext(UserContext)
    const {groups} = useContext(GroupContext)
    let month
    let data
    let currentInfo
    let groupName
    if(props.value && user){
        // console.log("props.value", props.value);
        month = monthNames[parseInt(props.value.date.substring(5, 7))-1].substring(0,3)
        data = props.value.date.substring(8, 10)
        if(props.value.action === "paid"){
            currentInfo = <h6>{props.value.hostname} get back USD ${Number(props.value.amount).toFixed(2)}</h6>
        }else{
            let name = props.value.username === localStorage.getItem('authUser') ? "You" : 
            props.value.username;
            currentInfo = <h6 style={{color:"red"}}>{name} owes USD ${Number(props.value.amount).toFixed(2)}</h6>
        }
        groupName = groups.filter(g => g.G_ID===props.value.G_ID)
    }
    return (
        <>
            {/* {date}  */}
        <Col>
            <Row>
                <Col sm={1}>
                    <Image src={category1} style={{width: "50px"}} rounded />
                    <Image src={props.value.action === "create" ? props.value.hostpic : props.value.userpic} style={{width: "30px", height: "30px", position: "absolute", top: "1.5em", left: "3em"}} roundedCircle/>
                </Col>
                <Col sm={9}>
                    <h4 style={{paddingTop: "6px", marginLeft: "10px"}}> {props.value.action === "create" ? (props.value.hostname===localStorage.getItem('authUser') ? "You add" : props.value.hostname + " add" ) : (props.value.username===localStorage.getItem('authUser') ? "You update" : props.value.username + " update")} "{props.value.description}" in "{groupName.length>0 ? groupName[0].name : null}"<FontAwesomeIcon icon={faCamera} /></h4>
                    {currentInfo}
                </Col>
                <Col>
                <p>{month} {data}</p>
                </Col>
            </Row>
        </Col>
        <p style={{border: "1px solid black", width: "100%"}}></p>
        </>
    )
}

export default ActivityInput