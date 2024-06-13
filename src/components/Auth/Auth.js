import React, { useEffect, useState } from 'react'
import useStyles from "./styles";
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useGoogleLogin } from '@react-oauth/google';
import LockOutlined from "@material-ui/icons/LockOutlined";
import Input from './Input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import {signin, signup} from '../../actions/auth.js'

const initialData = {
    firstName: "",
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState([]);
    const [formData, setFormData] = useState(initialData)

    const dispatch = useDispatch();
    const history = useNavigate();

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword)
    const handleSubmit = (e) => {
        e.preventDefault(); // default react akan render saat submit DON'T DELETE
        if(isSignup){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };
    const switchMode = () => {
        setIsSignup(prevSignup => !prevSignup)
        setShowPassword(false);
    };

    const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');
    
    const login = useGoogleLogin({
        onSuccess: res => {
            setUser(res)
        },
        onError: err => {
            googleError(err)
        },
        scope: 'open id profile email'
    });

    useEffect(()=> {
        if(user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then(res => {
                try {
                    const token = user.access_token;
                    const result = res.data;
                    setProfile(res.data);
                    dispatch({type: AUTH, data: {result, token}})
                    history('/')
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    },[user]);

  return (
    <Container component={'main'} maxWidth={'xs'}>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name='email' label="Email Address" handleChange={handleChange} type={'email'}  />
                    <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name={"confirmPassword"} label={'Repeat Password'} handleChange={handleChange} type={'password'} />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                
                <Button onClick={login}>
                    login google
                </Button>

                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account ? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
                
            </form>
        </Paper>
    </Container>
  )
}

export default Auth