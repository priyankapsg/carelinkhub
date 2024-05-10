import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import "./style.css";
import { toast } from "react-toastify";


let credit = 0;

const ProfileDetails = ({ users }) => {
  return (
    <div className="profile-details">
      {users && 
      <>
      <div>
      <h2>Profile Details</h2>
      <p>Name: {users.firstName} {users.lastName}</p>
      <p>Age: {users.age}</p>
      <p>Gender: {users.gender}</p>
      <p>Role: {users.role}</p>
      <p>Address: {users.address}</p>
      <p>Email: {users.email}</p>
      <p>Phone Number: {users.phoneNumber}</p>
      <p>Aadhar Number: {users.aadharNumber}</p>
      </div>
      {/* <div>
      <h4>Credits : {credit}</h4>
      </div> */}
      </>
      }
    </div>
  );
};

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
  button1: {
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
  button2: {
    backgroundColor: 'Red',
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

const Volunteerdashboard = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [showProfile, setShowProfile] = useState(true);
  const [request, setRequest] = useState(false);
  const [task, setTask] = useState(false);
  const [helpRequests, setHelpRequests] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    fetchHelpRequests();
    fetchUserDetails();
    fetchTask();
  }, []);

const handleApprove = async (_id, status) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/v/statusUpdate', { _id, status, id});
      if(response.status === 200){
        toast.success(response.data.msg);
        setTimeout(() => {
          window.location.reload();        
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
};

  const fetchHelpRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getallhelp/${id}`);      
      setHelpRequests(response.data);
    } catch (error) {
      console.error('Error fetching help requests:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getProfile/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getTask/${id}`);      
      setTaskList(response.data);
      if(credit === 0){
      for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].status === 'Stopped'){
            const duration = +response.data[i].duration;
            credit += duration;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching help requests:', error);
    }
  };

  const renderButton = (user, handleApprove, classes) => {
      if (user.status === "Requested") {
          return (
              <button className={classes.button1} onClick={() => handleApprove(user._id, "Accepted")}>
                  Accept
              </button>
          );
      } 
      else if (user.status === "Accepted") {
          return user.status;
      } 
      else if (user.status === "Verified") {
          return (
              <button className={classes.button1} onClick={() => handleApprove(user._id, "Started")}>
                  Start
              </button>
          );
      } 
      else if (user.status === "Started") {
        return user.status
      }
      else if(user.status === "Ended"){
          return (
              <button className={classes.button2} onClick={() => handleApprove(user._id, "Stopped")}>
                  Stop
              </button>
          );
      }
}

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <>
      <ul
        className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
        id='accordionSidebar'
      >
        <div
          className='sidebar-brand d-flex align-items-center justify-content-center'
          >
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='fas fa-laugh-wink' color="black"></i>
          </div>
          <div className='sidebar-brand-text mx-3'>Welcome</div>
        </div>
        <li className='nav-item active'>
          <div className='nav-link collapsed' onClick={() => { 
            setShowProfile(true);
            setRequest(false);
            setTask(false);
            setShowCredits(false);
            }} >
            <i className='fas fa-fw fa-user'></i>
            <span>profile details</span>
          </div>
        </li>
        <li className='nav-item'>
  <div className='nav-link collapsed' onClick={() => { 
    setShowProfile(false);
    setRequest(false);
    setTask(false);
    setShowCredits(true);
    }} >
    <i className='fas fa-fw fa-user'></i>
    <span>Credits</span>
  </div>
</li>

        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(false);             
            setRequest(true);
            setTask(false);
            fetchHelpRequests();
            setShowCredits(false);
            }}>
            <i className='fas fa-fw fa-question-circle'></i>
            <span>view requests</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(false);             
            setRequest(false);
            setTask(true);
            fetchTask();
            setShowCredits(false);
            }}>
            <i className='fas fa-fw fa-check-circle'></i>
            <span>completed tasks</span>
          </div>
        </li>
        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/login'>
            <i className='fas fa-fw fa-edit'></i>
            <span>logout</span>
          </Link>
        </li>
      </ul>
    </>
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>Volunteer Dashboard</h1>
        </header>
        {showCredits && (
  <div class="credits-wrapper">
     <div class="credits-container">
    {/* <h4>Credits Earned: {credit}</h4> */}
    <p class="credits-text">Credits Earned</p>
    <p class="credits-value">{credit}</p>
  </div>
  </div>
)}
        {showProfile && <ProfileDetails users={users} />}
        {request &&       
        <div className={classes.content}>
        <header className={classes.header}>
        </header>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableHeaderCell}>Name</th>
              <th className={classes.tableHeaderCell}>Phone Number</th>
              <th className={classes.tableHeaderCell}>Service</th>
              <th className={classes.tableHeaderCell}>Time Slot</th>
              <th className={classes.tableHeaderCell}>Address</th>
              <th className={classes.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {helpRequests.length > 0 && helpRequests.map(user => (
              <tr key={user._id}>
                <td className={classes.tableCell}>{user.userData.firstName}</td>
                <td className={classes.tableCell}>{user.userData.phoneNumber}</td>
                <td className={classes.tableCell}>{user.service}</td>
                <td className={classes.tableCell}>{user.timeSlot}</td>
                <td className={classes.tableCell}>{user.userData.address}</td>
                <td className={classes.tableCell}>{renderButton(user, handleApprove, classes)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
        }   
        {task &&       
        <div className={classes.content}>
        <header className={classes.header}>
        </header>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableHeaderCell}>S No</th>
              <th className={classes.tableHeaderCell}>Service</th>
              <th className={classes.tableHeaderCell}>Time Slot</th>
              <th className={classes.tableHeaderCell}>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {taskList.length > 0 && taskList.map((user, index) => (
              user.status === 'Stopped' ? 
              (<tr key={user._id}>
                <td className={classes.tableCell}>{index + 1}</td>
                <td className={classes.tableCell}>{user.service}</td>
                <td className={classes.tableCell}>{user.timeSlot}</td>
                <td className={classes.tableCell}>{user.createdAt}</td>
              </tr>) : ''
            ))}
          </tbody>
        </table>

        </div>
        }   
      </div>
    </div>
  );
};

export default Volunteerdashboard;
