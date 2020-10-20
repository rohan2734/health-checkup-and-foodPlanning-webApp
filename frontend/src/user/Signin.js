import React,{useState} from 'react';
import {Link} from 'react-router-dom';

import authAPI from '../authAPI/authAPI';
import Card from '../shared/components/UIElements/Card';
import Loading from '../shared/components/UIElements/Loading';
import Modal from '../shared/components/UIElements/Modal';
import Fade from 'react-reveal/Fade';

import './Signin.css';
const Signin = () => {

  const [values,setValues] = useState({
    username:'',
    email:'',
    password:'',
    error:'',
    success:false,
    loading:false
  }); 

  const {username,email,password,error,success,loading} = values;

  const handleChange = name => event =>{
    setValues({...values,[name]:event.target.value,error:false,})
  }

  //signin is from authAPI
  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values,loading:true})
    authAPI.signin({username:username,email:email,password})
    .then(data =>{
      if(data.errors || data.message){
        setValues({...values,error:data.errors||data.message,success:false,loading:false})
      }else{
        setValues({...values,
          username:'',
          email:'',
          password:'',
          error:'',
          success:true,
          loading:false
        })
      }
    })
  }

  const signInForm = () => (
   <Fade bottom> 
    <div className="container col-md-6 offset-md-3">
      <Card >
        <form >
          <div className="form-group">
            <label >Username</label>
            <input 
              onChange={handleChange('username')} 
              type="text" className="form-control"
              value={username}
            />
          </div>
          <div className="form-group">
            <label >Email</label>
            <input  
              onChange={handleChange('email')} 
              type="email" 
              className="form-control"
              value={email} />
          </div>
          <div className="form-group">
            <label >password</label>
            <input  
              onChange={handleChange('password')} 
              type="password" 
              className="form-control"
              value={password} />
          </div>
          <button onClick={clickSubmit} className="form-button">
            Submit
          </button>
          <div className="login-button">
            <Link className="login-button-link" to="/login">Already a user?Switch to Login Page</Link>
          </div>
        </form>
      </Card>
    </div>
    </Fade>
  )

  const showError = () => (
   <Fade bottom> 
    <div className="alter alert-danger" style={{display:error ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {error}
    </div>
  </Fade>
  )

  const showSuccess = () => (
    <div className="alert alert-info" style={{display:success ? '' : 'none' }}>
      New account is created.Please Login.
    </div>
  )
  return(
    <React.Fragment>
      {loading && (<Modal show={loading}>
          <Loading/>
      </Modal>)}
      {showError()}
      {showSuccess()}
      {signInForm()}
    </React.Fragment>
  )
}

export default Signin;