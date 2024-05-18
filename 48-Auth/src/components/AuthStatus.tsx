import * as React from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';



const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();
  
    if (!auth.isAuth) {
      return <p>You are not logged in.</p>;
    }
  
    return (
      <p>
        Welcome {auth.isAuth}!{" "}
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Sign out
        </button>
      </p>
    );
}

export default AuthStatus