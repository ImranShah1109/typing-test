import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph'

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultRef = db.collection('Results');
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];

    resultRef
      .where('userId', '==', uid)
      .orderBy('timeStamp', 'desc')
      .get()
      .then((snapshot) => {
      snapshot.docs.map((doc) => {
        tempData.push({...doc.data()});
        tempGraphData.push(
          [
            doc.data().timeStamp.toDate().toLocaleString().split(',')[0], 
            doc.data().wpm
          ]
        )
      })
      setData(tempData);
      setGraphData(tempGraphData.reverse());
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

  // console.log(data)

  return (
    <div className="canvas">
        <Graph graphData={graphData}/>
        <TableUserData data={data}/>
    </div>
  )
}

export default UserPage