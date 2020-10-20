import React,{useState,useEffect} from 'react';

import userAPI from './userAPI';
import {isAuthenticated} from '../authAPI/authAPI';
import Card from '../shared/components/UIElements/Card';
import './Profile.css';
import { Redirect } from 'react-router-dom';

const Profile = (props) => {
  const [values,setValues] = useState({
    username:'',
    email:'',
    password:'',
    error:'',
    loading:'',
    success:false
  });

  const {token} = isAuthenticated();

  const {username,email,password,error,success,loading} = values;

  const init =(userId) => {
    userAPI.getUser(userId,token)
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error||data.message})
      }else{
        setValues({...values,username:data.username,email:data.email})
      }
    })
  }

  useEffect(() => {
    init(props.match.params.userId)
  },[])

  const handleChange = name => e => {
    setValues({...values,error:'',[name]:e.target.value});
  };

  const clickSubmit = e => {
    e.preventDefault();
    userAPI.updateUser(props.match.params.userId,token,{username,email,password})
    .then(data => {
      if(data.error||data.message){
        console.log(data.error)
      }else{
        console.log('49',data.user)
        const user = data.user;
        userAPI.updateUserInLocalStorage(user,() =>{
          setValues({...values,username:user.username,email:user.email,success:true})
        })
      }
    })
  }

  const redirectUser = success => {
    if(success){
      return <Redirect to="/cart" />
    }
  }

  const updateProfile = (username,email,password) => (
    <form>
      <div className="container col-md-6 offset-md-3" >
        <Card>
          <div className="form-group">
            <label className="text-muted">Username</label>
            <input 
              type="text" 
              onChange={handleChange('username')} 
              className="form-control" 
              value={username}
            />
            <label className="text-muted">Email</label>
            <input 
              type="email" 
              onChange={handleChange('email')} 
              className="form-control" 
              value={email}
            />
            <label className="text-muted">Password</label>
            <input 
              type="password" 
              onChange={handleChange('password')} 
              className="form-control" 
              value={password}
            />
          </div>
          <button onClick={clickSubmit} className="form-button">Submit</button>
        </Card>
      </div>
    </form>
  )

  return (
    <React.Fragment>
      {updateProfile(username,email,password)}
      {redirectUser(success)}
    </React.Fragment>
  )
}
export default Profile;