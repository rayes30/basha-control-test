/* src/Dashboard.jsx - shows devices list and opens device view */
import React, { useEffect, useState } from 'react'
import DevicesList from './DevicesList'
import DeviceView from './DeviceView'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

export default function Dashboard({ user }){
  const [deviceId, setDeviceId] = useState(null)
  return (
    <div className="app-grid">
      <header className="topbar">
        <div className="brand">Basha Control</div>
        <div className="actions">
          <button onClick={()=>signOut(auth)}>Sign out</button>
        </div>
      </header>
      <aside className="sidebar">
        <DevicesList onOpenDevice={(id)=>setDeviceId(id)} />
      </aside>
      <main className="main">
        {deviceId ? <DeviceView deviceId={deviceId} /> : <div className="welcome">Select a device to control</div>}
      </main>
    </div>
  )
}
