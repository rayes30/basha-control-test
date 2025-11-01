/* src/Login.jsx - educational, inline comments */
import React, { useState } from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login(){
  const [email, setEmail] = useState('admin@example.com')
  const [pass, setPass] = useState('password123')
  const [err, setErr] = useState(null)

  async function submit(){
    setErr(null)
    try{
      // sign in using Firebase Auth (Email/Password)
      await signInWithEmailAndPassword(auth, email, pass)
    }catch(e){
      setErr(e.message)
    }
  }

  return (
    <div className="center">
      <div className="card">
        <h1>Basha Control</h1>
        <p className="muted">Hacker Dark Edition — Admin Login</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input value={pass} type="password" onChange={e=>setPass(e.target.value)} placeholder="password" />
        <button onClick={submit}>Sign in</button>
        {err && <p className="error">{err}</p>}
        <p className="muted small">Use a Firebase Auth Email account. Add its UID to /admins in Firestore.</p>
      </div>
    </div>
  )
}
