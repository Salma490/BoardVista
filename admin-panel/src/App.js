import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://<BACKEND_HOST>:5000/api';

function App(){
  const [stats,setStats]=useState({});
  const [complaints,setComplaints]=useState([]);

  useEffect(()=>{ fetch(); },[]);

  async function fetch(){
    const s = await axios.get(`${API}/admin/stats`, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });
    setStats(s.data);
    const c = await axios.get(`${API}/complaints`, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });
    setComplaints(c.data);
  }

  return (
    <div style={{padding:20}}>
      <h1>Admin Panel</h1>
      <div>Users: {stats.users} | Owners: {stats.owners} | Boardings: {stats.boardings}</div>
      <h2>Complaints</h2>
      {complaints.map(c=>(
        <div key={c._id} style={{border:'1px solid #ddd',padding:12,margin:8}}>
          <div>{c.message}</div>
          <div>From: {c.fromUser?.name}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
