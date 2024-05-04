import React, {useEffect, useState} from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picture from '../../components/Picture'
import {DB} from '../../constants/DB'
import Application from '../../components/application/applicaiton'
import axios from 'axios';
import { useHistory} from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [picture, setPicture] = useState();
    const [currency, setCurrency] = useState('USD');
    const [time, setTime] = useState('GMT-1');
    const [language, setLanguage] = useState('English');
    const [display,setDisplay] = useState("none")

    const getAll_URL= `${DB}/getUser`
    const update_URL= `${DB}/update`
    const emailID = localStorage.getItem('authEmail');
    const history = useHistory();

    function setup() {
        setUsername(user[0].username)
        // localStorage.setItem('authUser', user[0].username);
        setEmail(user[0].email)
        setPhone(user[0].phone)
    }

    function toggleDisplay(){
        if(display === "none"){
            setDisplay("display")
            setup()
        }
        else
            setDisplay("none")
    }

    
    useEffect( ()=>{
        async function load(){
            await fetch(getAll_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailID
                })
            }).then(res => res.json()).then(result=>{
                // console.log("!!!!!!",result.dataset);
                setUser(result.dataset)
            })
        }
        load()
    },[picture])

    function handleUpdate(){
        toggleDisplay();
        // console.log(username, email, phone);
        let newInfo = {
            username: username,
            email: email,
            phone: phone
        }
        // console.log("user[0]", user[0]);
        // console.log("newInfo", newInfo);
        Object.assign(user[0], newInfo)
    }

    function handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        // console.log(value, name);
        setup()
        if(name === "currency"){
            user[0].currency = value
            setCurrency(value);
        }
        if(name === "time"){
            user[0].time = value
            setTime(value);
        }
        if(name === "language"){
            user[0].language = value
            setLanguage(value);
        }
    }
    async function updateAll(){
        // console.log("ALL INFO: ", username, email, picture, phone, currency, time, language);
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('picture', picture);
        formData.append('phone', phone);
        formData.append('currency', currency);
        formData.append('time', time);
        formData.append('language', language);
        formData.append('emailID', emailID);
        formData.append('upload','user');
        axios({
            method: "POST",
            url: update_URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        setTimeout(refreshPage, 1000);
    }
        
    function refreshPage() {
        window.location.reload(false);
    }

    let title = ["username", "email", "phone"]
    let items = [];
    if(user){
        for (let number = 0; number < 3; number++) {
            items.push(
                <>
                <Form.Label key={Math.random()}>
                    {'Your ' +title[number]}
                    <Button variant="link" onClick={toggleDisplay} key={Math.random()}><FontAwesomeIcon icon={faPen} />Edit</Button><br />
                    <div data-testid="name-input-box">{user[0][title[number]]}</div>
                </Form.Label>
                <br />
                </>
            );
        }
    }
    

    let currencies = []
    let times = []
    let languages= []
    currencies = ['USD', 'CNY', 'KWD', 'BHD', 'GBP', 'EUR', 'CAD'];
    currencies = currencies.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    });
    times = ["(GMT-08:00) Pacific Time (US & Canada)", "(GMT-09:00) Alaska", "(GMT-10:00) Hawaii", '(GMT-11:00) Midway Island, Samoa', '(GMT-12:00) International Date Line West'];
    times = times.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    });
    languages = ['English', 'Chinese', 'Cambodian', 'Basque', 'French' ];
    languages = languages.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    });

    const createItem= async(newItem) => {
        setPicture(newItem.image)
        setEmail(emailID)
        setup()
        // console.log(newItem.image);
        // console.log("inside createItem");
    }
    
    if(user){
        // console.log("user[0].picture",user[0].picture);
        const Oldpicture = user[0].picture ? <Picture createItem={createItem} old={user[0].picture}/> : <Picture createItem={createItem} />
        localStorage.setItem('authUser', user[0].username);
        return (
        <>
        <Row className="justify-content-md-center">
            <Col sm={2}>
                {Oldpicture}
            </Col>
            <Col sm={2}>
                <Form.Group>
                    {items}
                </Form.Group>
            </Col>
            <Col sm={2}>
                <Form.Group controlId="exampleForm.ControlSelect1" key="currency">
                    <label htmlFor="currency">Your default currency</label>
                    <select
                        name="currency"
                        id="currency"
                        value={user[0].currency}
                        className="form-control"
                        onChange={handleChange}>
                        {currencies}
                    </select>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2" key="time">
                    <label htmlFor="time">Your time zone</label>
                    <select
                        name="time"
                        id="time"
                        value={user[0].time}
                        className="form-control"
                        onChange={handleChange}>
                        {times}
                    </select>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect3" key="language">
                    <label htmlFor="language">Language</label>
                    <select
                        name="language"
                        id="language"
                        value={user[0].language}
                        className="form-control"
                        onChange={handleChange}>
                        {languages}
                    </select>
                </Form.Group>
            </Col>
        </Row>
        <Button variant="danger" style={{float:"right"}} onClick={updateAll}>Save</Button>

        <Application.Base display = {display}>
            <Application.Close toggleDisplay={toggleDisplay}><FontAwesomeIcon icon={faTimes} /></Application.Close>
            <Form key="form">
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={({ target }) => setEmail(target.value)}/>
                </Form.Group>


                <Form.Group controlId="password">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" value={phone} onChange={({ target }) => setPhone(target.value)}/>
                </Form.Group>

                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Form>
        </Application.Base> 
        </>
    )
    }else{
        return <div>Loading...</div>
    }
    
}

export default Profile