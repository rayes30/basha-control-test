/* src/App.jsx
   Main app - simple router for Login / Dashboard
*/
import React, { useState, useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth"

export default function App(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=> setUser(u))
    return ()=> unsub()
  },[])

  if(!user) return <Login />
  return <Dashboard user={user} />
}
