import React, {useState, useEffect } from 'react';
import {DB} from '../constants/DB'
const ActivityContext = React.createContext()

function ActivityProvider({children}) {
    const [activities, setActivities] = useState()

    const getAll_URL= `${DB}/allActivity`
    // const update_URL= `${DB}/update`
    // const emailID = localStorage.getItem('authEmail');
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
                    ID: localStorage.getItem("authID")
                })
            }).then(res => res.json()).then(result=>{
                setActivities(result.dataset)
                // console.log("this is a activity context", result.dataset);
            })
        }catch(e){
            console.log(e);
        }
    },[])

    return (
        <>
        <ActivityContext.Provider  value={{
            activities
            }}>
            {children}
        </ActivityContext.Provider>
        </>
    )
}



export{ActivityProvider, ActivityContext}