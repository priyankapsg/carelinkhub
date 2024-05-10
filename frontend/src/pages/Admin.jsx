import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    flex: 1,
    overflowX: 'auto',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderCell: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '8px',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
}));

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [request, setRequest] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [selectedService, setSelectedService] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/getallusers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/update', { email, status: true });
      toast.success(response.data.msg);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}> 
    {/* <Sidebar /> */}
    <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>
      <div className='sidebar-brand d-flex align-items-center justify-content-center'>
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='fas fa-laugh-wink'></i>
          </div>
          <div className='sidebar-brand-text mx-3'>Welcome</div>
        </div>
        <li className='nav-item active'>
          <div className='nav-link collapsed' onClick={() => { 
            setShowProfile(true); 
            setShowServices(false); 
            setShowTask(false);
            setShowForm(false);
            }}>
            <i className='fas fa-fw fa-user'></i>
            <span>User List</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(false); 
            setShowServices(true); 
            setShowTask(false);
            setShowForm(false);
            }}>
            <i className='fas fa-fw fa-question-circle'></i>
            <span>Issues</span>
          </div>
        </li>
        {/* <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(true); 
            setShowServices(false);
            setShowTask(false);
            setShowForm(false);
            }}>
            <i className='fa fa-spinner'></i>
            <span>Request List</span>
          </div>
        </li> */}
        {/* <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(true); 
            setShowServices(false);
            setShowTask(false);
            setShowForm(false);
            }}>
            <i className='fas fa-fw fa-check-circle'></i>
            <span>Completed Task</span>
          </div>
        </li> */}
        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/login'>
            <i className='fas fa-fw fa-edit'></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>Admin Dashboard</h1>
        </header>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableHeaderCell}>Name</th>
              <th className={classes.tableHeaderCell}>Email</th>
              <th className={classes.tableHeaderCell}>Age</th>
              <th className={classes.tableHeaderCell}>Gender</th>
              <th className={classes.tableHeaderCell}>Address</th>
              <th className={classes.tableHeaderCell}>City</th>
              <th className={classes.tableHeaderCell}>Phone Number</th>
              <th className={classes.tableHeaderCell}>Aadhar Number</th>
              <th className={classes.tableHeaderCell}>role</th>
              <th className={classes.tableHeaderCell}>Document</th>
              <th className={classes.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className={classes.tableCell}>{user.firstName}</td>
                <td className={classes.tableCell}>{user.email}</td>
                <td className={classes.tableCell}>{user.age}</td>
                <td className={classes.tableCell}>{user.gender}</td>
                <td className={classes.tableCell}>{user.address}</td>
                <td className={classes.tableCell}>{user.city}</td>
                <td className={classes.tableCell}>{user.phoneNumber}</td>
                <td className={classes.tableCell}>{user.aadharNumber}</td>
                <td className={classes.tableCell}>{user.role}</td>
                <td>
                <img src={user.file} alt='' style={{ width: '200px', height: '200px' }} />
                </td>
              {user.status === false ? 
                <td className={classes.tableCell}>
                  <button className={classes.button} onClick={() => handleApprove(user.email)}>Approve</button>
                </td>
              : 'Approved'}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>

  );
};

export default Admin;
