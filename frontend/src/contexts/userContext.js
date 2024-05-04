import React, {useState, useEffect } from 'react';
import {DB} from '../constants/DB'
const UserContext = React.createContext()

function UserProvider({children}) {
    const [user, setUser] = useState()
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [phone, setPhone] = useState()
    const [picture, setPicture] = useState();
    const [currency,setCurrency] = useState()
    const [time,setTime] = useState()
    const [language,setLanguage] = useState()

    const getAll_URL= `${DB}/searchUser`
    const update_URL= `${DB}/update`
    const emailID = localStorage.getItem('authEmail');
    // console.log("this is email", emailID);

    useEffect( ()=>{
        try{
            fetch(getAll_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailID
                })
            }).then(res => res.json()).then(result=>{
                setUser(result.dataset)
                // console.log("this is a user context", result.dataset);
            })
        }catch(e){
            console.log(e);
        }
    },[username, email, phone, picture, currency, time, language])

    function handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        // console.log(value, name);
        if(name === "username"){
            setUsername(value);
        }
        if(name === "email"){
            setEmail(value);
        }
        if(name === "phone"){
            setPhone(value);
        }
        if(name === "currency"){
            setCurrency(value);
        }
        if(name === "time"){
            setTime(value);
        }
        if(name === "language"){
            setLanguage(value);
        }
    }
    function handleUpdate() {
        fetch(update_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                phone: phone,
                emailID: emailID
            })
        }).then(res => res.json()).then(result=>{
            setUser(result.dataset)
        })
    }
    return (
        <>
        <UserContext.Provider  value={{
            user, handleChange, handleUpdate, username, email, phone, picture, currency, time, language
            }}>
            {children}
        </UserContext.Provider>
        </>
    )
}



export{UserProvider, UserContext}