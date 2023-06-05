import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {theme} = useTheme();

    const handleSubmit = () =>{
        if(!email || !password){
            toast.warning('fill all details',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        auth.signInWithEmailAndPassword(email, password).then((res)=>{
            toast.success('logged in',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }).catch((err)=>{
            toast.error('invalid credentials',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }

  return (
    <Box
        p={3}
        style={{
            display : 'flex',
            flexDirection : 'column',
            gap : '20px'
        }}
        >
        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            InputLabelProps={{
                style:{
                    color : theme.textColor
                }
            }}
            InputProps={{
                style : {
                    color : theme.textColor
                }
            }}/>
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
            InputLabelProps={{
                style:{
                    color : theme.textColor
                }
            }}
            InputProps={{
                style : {
                    color : theme.textColor
                }
            }}/>
        <Button
            variant='contained'
            size='large'
            style={{
                backgroundColor : theme.textColor,
                color : theme.background
            }}
            onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default LoginForm