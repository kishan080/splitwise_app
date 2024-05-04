import React, {useState, useEffect} from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/form.png'
import {DB} from '../constants/DB'

function Balance(props) {
    // console.log("balance", props.id);
    const [userInfo, setUserInfo] = useState()

    const calculate_URL = `${DB}/calculate`
    useEffect( ()=>{
        try{
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
                // setUser(result.dataset)
                setUserInfo(result.dataset)
                // console.log("calculate: ",result.dataset);
            })
        }catch(e){
            console.log(e);
        }
    },[props.id])

    let userTotal;
    if(userInfo){
        userTotal = userInfo.map((info, index) => <>
        <Row key={Math.random()}>
            <Col md={3} key={Math.random()}>
            <Image src={info.picture} roundedCircle style={{width: "40px", height: "40px"}}/>
            </Col>
            <Col key={Math.random()}>
                <Row key={Math.random()}>
                    <h5>{info.username}</h5>
                </Row>
                <Row key={Math.random()}>
                    {
                    info.total > 0 ?
                    <h6><span>owes</span> USD ${Number(info.total).toFixed(2)}</h6> : <h6><span>gets back</span> USD ${Number(-info.total).toFixed(2)}</h6>
                    }
                </Row>
            </Col>
        </Row>
        </>)
        return (
        <>    
        {userTotal}
        </>
        )
    }else{
        return(<div>Waiting for calculation...</div>)
    }
        
    
}

export default Balance