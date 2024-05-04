import React, {useContext, useEffect} from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/signup.png'
import category1 from '../images/shopping.png'
import category2 from '../images/daliy.png'
import category3 from '../images/form.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../contexts/userContext'
import { ActivityContext } from '../contexts/activityContext'

function ExpenseInput(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const {user} = useContext(UserContext)
    const {activities} = useContext(ActivityContext)

    // console.log("inside expenseInput: ", props.value);
    let currentUser
    let month
    let data
    let desc
    let userInfo
    let paid
    if(props.value && user && activities.length>0){
        let u1 = user.filter(u => u.ID === parseInt(props.value.user))
        if(props.value.amount > 0){
            month = monthNames[parseInt(props.value.date.substring(5, 7))-1].substring(0,3)
            data = props.value.date.substring(8, 10)
            userInfo = <h6>{u1[0].username}</h6>
            paid = <h4>USD${props.value.amount}</h4>
        }else{
            // console.log("all activity", activities)
            let filterData = activities.filter(a => a.E_ID === props.value.E_ID)
            // console.log("filterData", filterData);
            if(filterData.length > 0){
                month = monthNames[parseInt(filterData[0].date.substring(5, 7))-1].substring(0,3)
                data = filterData[0].date.substring(8, 10)
                userInfo = <h6 style={{color: "red"}}>{u1[0].username} Paid</h6>
                paid = <h4 style={{color: "red"}}>USD${filterData[0].action}</h4>
            }
        }
        desc = props.value.description
        currentUser = u1[0] ? 
        <>
        {userInfo}
        {paid}
        </> : null;
    }

    // Object.assign(props.createItem, props.value.date)

    if(activities){
        return (
        <>
          <Col md={1}>
            <h6>{month}</h6>
            <h4>{data}</h4>
        </Col>
        <Col md={7}>
            <Row>
                <Image src={category1} style={{width: "50px"}} rounded />
                <h4 style={{paddingTop: "6px", marginLeft: "10px"}}>{desc}<FontAwesomeIcon icon={faCamera} /></h4>
            </Row>
        </Col>
        <Col md={4}>
            {currentUser}
        </Col>
        <p style={{border: "1px solid black", width: "100%"}}></p>
        </>
        )
    }
}

export default ExpenseInput