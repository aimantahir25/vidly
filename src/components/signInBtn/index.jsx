import React, { useContext } from 'react';
import { SignInWithGoogle } from '../../services/auth';
import { UserContext } from '../../context/useUser';
import './style.css';

const SignInBtn = () => {

    const {setUser}  = useContext(UserContext).user;
    
    const SignInUser = async () => {
        const signInUser = await SignInWithGoogle();
        setUser(signInUser);
    }

    return ( 
    <div className="signInBtn" onClick={SignInUser}>
    <p>Sign In with Google</p>
    </div> );
}
 
export default SignInBtn;