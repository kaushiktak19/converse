import React from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import converse from "./CONVERSE.png"


function Login() {
    
    console.log(useStateValue());

    const [{}, dispatch] = useStateValue(); // context-API
    
    function signIn() {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    }

    // .then((result) => (console.log(result))) -> before context api


    return (
        <div className='login'>
            <div className='login_container'>
            <img src={converse} alt="CONVERSE" />
                <div className='login_text'>
                    <h1>Sign in to Converse</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
