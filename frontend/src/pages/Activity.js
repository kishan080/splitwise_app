import React, {useState,useContext,useEffect}from 'react'
import { Button, Col, Row, Image, Jumbotron, Container } from 'react-bootstrap';
import ActivityInput from '../components/ActivityInput'
import {ActivityContext} from '../contexts/activityContext'

function Activity() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    
    let expenseList = [];
    const {activities} = useContext(ActivityContext)

    if(activities){
        activities.map((item, index) => {
            expenseList.push(<ActivityInput value={item} key={index} />)
        });
    }

    // console.log("expenseList", expenseList);
    expenseList.sort((a, b) => (a.props.value.date > b.props.value.date) ? -1 : 1)

    return (
        <>
        <Col sm={6}>
            <Jumbotron style={{padding: "10px"}}>
                <Container>
                    <Row>   
                        <h3>Recent Activity</h3>
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
        </>
    )
}

export default Activity