import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const UserPage = () => {
  const [data, setData] = useState([]);

  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultRef = db.collection('Results');
    const { uid } = auth.currentUser;
    let tempData = [];
    resultRef.where('userId', '==', uid).get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        tempData.push({...doc.data()});
      })
      setData(tempData);
    })
  }

  useEffect(() => {
    if(!loading){
      fetchUserData();
    }
    if(!loading && !user){
      navigate('/');
    }
  }, [loading]);

  if(loading){
    return <CircularProgress/>
  }

  return (
    <div>UserPage</div>
  )
}

export default UserPage