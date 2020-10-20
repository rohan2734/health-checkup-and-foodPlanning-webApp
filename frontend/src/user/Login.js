import React,{useState,useContext} from 'react';
import { Redirect } from 'react-router-dom';

//import AuthContext from '../shared/context/auth-context';
import authAPI, { authenticate } from '../authAPI/authAPI';
import Card from '../shared/components/UIElements/Card';
import Loading from '../shared/components/UIElements/Loading';
import Modal from '../shared/components/UIElements/Modal';
import Fade from 'react-reveal/Fade';

import './Login.css';


const Login = () => {

  // const auth = useContext(AuthContext);

  const [values,setValues] = useState({
    email:'rohan@gmail.com',
    password:'rohan123',
    error:'',
    loading:false,
    redirectToReferrer:false,
  }); 

  const {email,password,error,loading,redirectToReferrer} = values;
  
  const {role,userId,token} = authAPI.isAuthenticated();

  const handleChange = name => event =>{
    setValues({...values,[name]:event.target.value,error:false,})
  }

  //signin is from authAPI
  const clickSubmit = event => {
    event.preventDefault();
    
    setValues({...values,loading:true});
    authAPI.login({email:email,password})
    .then(data =>{
      if(data.errors || data.message){
        setValues({...values,error:data.errors||data.message,success:false,loading:false})
      }else{
        authenticate(data,() => {
          setValues({...values,
          redirectToReferrer:true})
          //auth.login(data.userId,data.token);
        })
      }
    })
  }

  const loginForm = () => (
    <Fade bottom>
    <div className="container col-md-6 offset-md-3">
      <Card >
        <form >
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
        </form>
      </Card>
    </div>
    </Fade >
  )

  const showError = () => (
    <Fade bottom>
    <div className="alter alert-danger" style={{display:error ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {error}
    </div>
    </Fade>
  )

  // const showLoading = () => (
  //    loading && <Loading />
  // )

  const redirectUser = () => {
    if(redirectToReferrer){
      if(role && role === 1){
        return <Redirect to="/admin/dashboard" />
      }else{
        return <Redirect to="/user/dashboard" />
      }
    }
    if(authAPI.isAuthenticated()){
      return <Redirect to="/" />
    }
  }

  return(
    <React.Fragment>
      {loading && (<Modal show={loading}>
          <Loading/>
      </Modal>)}
      {showError()}
      {loginForm()}
      {redirectUser()}
    </React.Fragment>
  )
}

export default Login;