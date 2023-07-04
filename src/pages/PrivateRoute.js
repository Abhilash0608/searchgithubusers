import React from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children,...rest}) => {
  const navigate=useNavigate()
  const {isAuthenticated,user}=useAuth0()
  const isUser=isAuthenticated && user;
  if(!user){
    return <Navigate to='/login' />
  }
  return children
};
export default PrivateRoute;
