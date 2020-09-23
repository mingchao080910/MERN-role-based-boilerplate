import React, {} from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { USER_LOADED, AUTH_ERROR } from '../../redux/types'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import { useState } from 'react'

const Home = ({history}) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.name);

  useEffect(() => {
    if(localStorage.token)
      loadUsers();
    else
      history.push('/login');
    // eslint-disable-next-line
  }, []);
  
  const loadUsers = async () =>{ 
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get('/api/auth/me');
        setUsername(res.data.data.name);
        dispatch({type: USER_LOADED, payload: res.data.data});
      } catch (err) {
        console.log(err);
        dispatch({type: AUTH_ERROR, payload: err.message}); 
      }
  }

  return (
    <div>
          <p>Role: {user?.role}</p>
          <h1>Hi {username}! Welcome to Application</h1>
    </div>
  )
}

export default Home
