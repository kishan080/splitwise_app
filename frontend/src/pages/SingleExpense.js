import React, { useState, useEffect } from 'react'
import { Modal, Button, Image, Row, Col, InputGroup, FormControl, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import category1 from '../images/form.png'
import {DB} from '../constants/DB'

function SingleExpense() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const group_URL = `${DB}/getGroup`
    const addExpenses_URL = `${DB}/addExpenses`
    const [groups,setGroups] = useState();
    const [input, setInput] = useState();
    const [description, setDescription] = useState()
    const [money, setMoney] = useState();
    const [currentGroup, setCurrentGroup] = useState()
    const [others, setOthers] = useState()

    useEffect( ()=>{
        try{
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
                setGroups(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
    },[])

    function handleSubmit() {
        try{
            fetch(addExpenses_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: document.getElementById("groupName").innerHTML,
                    host: localStorage.getItem('authID'),
                    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    description: description,
                    expense: money
                })
            }).then(res => res.json()).then(result=>{
                console.log(result.dataset);
            })
        }catch(e){
            console.log(e);
        }
        handleClose();
        setTimeout(refreshPage, 1000);
    }
        
    function refreshPage() {
        window.location.reload(false);
    }
    
    let searchGroup = ''
    let newG
    
    function cancel(){
        // console.log("click"); 
        searchGroup = <Row style={{borderBottom: "1px solid black"}}>
            With you and: <Form.Control type="text" placeholder="Enter group name" onChange={({ target }) => setInput(target.value)}  value={input} name="group" style={{width: "70%", marginLeft: "20px"}}/>
        </Row>
        setInput('')
    }

    if(groups){
        // console.log(groups);
        newG = groups.filter((g) => (g.name === input && g.invitation===1))
        searchGroup = newG[0] ? 
        <>
        <Row>
            Group name: 
            <Col sm={2}>
                {console.log("pic", newG)}
                <Image src={newG[0].picture} roundedCircle style={{width: "30px", height: "30px"}}/>
            </Col>
            <div style={{width: "100px"}} id="groupName">{newG[0].name}</div>
            <FontAwesomeIcon icon={faTimes} onClick={cancel}/>
        </Row>
        </> 
        : 
        <Row style={{borderBottom: "1px solid black"}}>
            With you and: <Form.Control type="text" placeholder="Enter group name" onChange={({ target }) => setInput(target.value)}  value={input} name="group" style={{width: "70%", marginLeft: "20px"}}/>
        </Row>
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="ml-3">
                Add Expense
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Add an expense</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "300px" }}>
                    {searchGroup}
                    <p></p>
                    <Row>
                        <Col md={3}>
                            <Image src={category1} style={{width: "100px"}} rounded />
                        </Col>
                        <Col md={7}>
                            <InputGroup className="mb-3">
                                <Form.Control type="text" placeholder="Enter Description" value={description} onChange={({ target }) => setDescription(target.value)} required/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" placeholder="Amount (to the nearest dollar)" value={money} onChange={({ target }) => setMoney(target.value)} required/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SingleExpense;