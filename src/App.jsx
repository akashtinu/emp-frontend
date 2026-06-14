// import { useState, useEffect } from 'react';
// import { getUsers, createUser, deleteUser } from './services/api';

// export default function App() {
//   const [users, setUsers] = useState([]);
//   const [name, setName]   = useState('');
//   const [email, setEmail] = useState('');

//   const load = () => getUsers().then(r => setUsers(r.data));
//   useEffect(() => { load(); }, []);

//   const submit = async (e) => {
//     e.preventDefault();
//     await createUser({ name, email });
//     setName(''); setEmail('');
//     load();
//   };

//   return (
//     <div style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
//       <h1>Users</h1>
//       <form onSubmit={submit}>
//         <input value={name}  onChange={e => setName(e.target.value)}
//                placeholder="Name" required />
//         <input value={email} onChange={e => setEmail(e.target.value)}
//                placeholder="Email" required />
//         <button type="submit">Add</button>
//       </form>
//       <ul>
//         {users.map(u => (
//           <li key={u.id}>
//             {u.id} - {u.name} — {u.email}
//             <button onClick={() => deleteUser(u.id).then(load)}>
//               Delete
//             </button>
//             <button>update</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './services/api';

export default function App() {
  const [users, setUsers]         = useState([]);
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');

  // Edit modal state
  const [editUser, setEditUser]   = useState(null);   // which user is being edited
  const [editName, setEditName]   = useState('');
  const [editEmail, setEditEmail] = useState('');

  const load = () => getUsers().then(r => setUsers(r.data));
  useEffect(() => { load(); }, []);

  // Add new user
  const handleAdd = async (e) => {
    e.preventDefault();
    await createUser({ name, email });
    setName(''); setEmail('');
    load();
  };

  // Open edit modal — pre-fill fields with existing data
  const openEdit = (user) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // Save updated user
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(editUser.id, { name: editName, email: editEmail });
    setEditUser(null);
    load();
  };

  return (
    <div style={{ padding: 32, maxWidth: 650, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Users</h1>

      {/* ── Add Form ── */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        
        

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', flex: 1 }}
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', flex: 1 }}
        />
        <button type="submit"
          style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          Add
        </button>
      </form>

      {/* ── Users Table ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9',color:'blue' }}>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={td}>{u.id}</td>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.email}</td>
              <td style={td}>
                {/* Edit button */}
                <button onClick={() => openEdit(u)}
                  style={{ padding: '5px 12px', marginRight: 8, background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                  Edit
                </button>
                {/* Delete button */}
                <button onClick={() => deleteUser(u.id).then(load)}
                  style={{ padding: '5px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Edit Modal ── */}
      {editUser && (
        <div style={overlay}>
          <div style={modal}>
            <h2 style={{ marginTop: 0, color:'black'}}>Edit User</h2>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color:'black'}}>Name</label>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color:'black'}}>Email</label>
                <input
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setEditUser(null)}
                  style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: '#e03636', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const th = { padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: 14 ,color:'black'};
const td = { padding: '10px 14px', fontSize: 14 };
const overlay = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.4)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', zIndex: 1000
};
const modal = {
  background: '#fff', borderRadius: 10, padding: 28,
  width: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
};