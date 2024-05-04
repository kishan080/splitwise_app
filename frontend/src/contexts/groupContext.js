import React, {useState, useEffect } from 'react';
import {DB} from '../constants/DB'
const GroupContext = React.createContext()

function GroupProvider({children}) {
    const [groups, setGroups] = useState()

    const getAll_URL= `${DB}/allGroup`
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
                    id: localStorage.getItem("authID")
                })
            }).then(res => res.json()).then(result=>{
                setGroups(result.dataset)
                // console.log("this is a group context", result.dataset);
            })
        }catch(e){
            console.log(e);
        }
    },[])
    
    return (
        <>
        <GroupContext.Provider  value={{
            groups
            }}>
            {children}
        </GroupContext.Provider>
        </>
    )
}



export{GroupProvider, GroupContext}