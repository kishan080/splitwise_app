import React, {useState, useEffect} from 'react'
import Routers from "./Routers/Routers"
import './App.css';
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import {UserProvider} from './contexts/userContext'
import {GroupProvider} from './contexts/groupContext'
import {ActivityProvider} from './contexts/activityContext'

function App() {
  return (
    <>
    <ActivityProvider>
      <GroupProvider>
        <UserProvider>
          <Header />
          <Routers/>
        </UserProvider>
      </GroupProvider>
    </ActivityProvider>
    </>
  )
}

export default App
