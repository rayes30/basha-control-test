/* src/DeviceView.jsx - issue commands to device (creates a doc under /devices/{deviceId}/commands) */
import React, { useState } from 'react'
import { db } from './firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

export default function DeviceView({ deviceId }){
  const [msg,setMsg] = useState('')
  async function issue(type, payload){
    const id = `cmd-${Date.now()}-${Math.random().toString(36).slice(2,6)}`
    const ref = doc(collection(db, `devices/${deviceId}/commands`), id)
    await setDoc(ref, {
      id, type, payload, issuedBy: 'owner', status: 'pending', createdAt: new Date()
    })
    alert('Command issued: '+type)
  }

  return (
    <div>
      <h2>Device: {deviceId}</h2>
      <div className="cmds">
        <button onClick={()=>issue('ping',{})}>Ping</button>
        <button onClick={()=>issue('request_status',{})}>Request status</button>
      </div>
      <div className="custom">
        <input placeholder="custom message" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button onClick={()=>issue('custom',{msg})}>Send</button>
      </div>
    </div>
  )
}
