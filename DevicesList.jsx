/* src/DevicesList.jsx - educational comments included */
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function DevicesList({ onOpenDevice }){
  const [devices, setDevices] = useState([])
  useEffect(()=>{
    async function load(){
      // read devices collection from Firestore
      const snaps = await getDocs(collection(db, 'devices'))
      setDevices(snaps.docs.map(d=>({ id: d.id, ...d.data() })))
    }
    load()
  },[])
  return (
    <div>
      <h3>Devices</h3>
      <ul className="devices">
        {devices.map(d=> (
          <li key={d.id} className="device">
            <div className="did">{d.id}</div>
            <div className="meta">lastSeen: {d.lastSeen?.toDate ? d.lastSeen.toDate().toString() : '-'}</div>
            <div className="ctrl"><button onClick={()=>onOpenDevice(d.id)}>Open</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
