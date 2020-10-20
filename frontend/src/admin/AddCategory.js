import React,{useState} from 'react';
import {Link} from 'react-router-dom';

import authAPI from '../authAPI/authAPI';
import adminAPI from '../admin/adminAPI';

import Fade from 'react-reveal/Fade';
import Card from '../shared/components/UIElements/Card';
import Loading from '../shared/components/UIElements/Loading';
import Modal from '../shared/components/UIElements/Modal';

import './AddCategory.css';

const AddCategory = ( ) => {
  const [values,setValues] = useState({
    name:'',
    error:'',
    success:false,
    loading:false
  })

  //destructure user and token from localstorage
  const {userId,email,role,username,token} = authAPI.isAuthenticated();
  const{name} = values;

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values,error:'',success:false,loading:true})
    adminAPI.createCategory(userId,token,{name})
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error||data.message,loading:false})
      }else{
        setValues({...values,error :'',success:true,loading:false});
      }
    })
  }

  const showSuccess = () => (
    <Fade top>
    <div className="alter alert-danger" style={{display:values.success ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {name} category is created
    </div>
    </Fade>
  )

  const showError = () => (
    <Fade top>
    <div className="alter alert-danger" style={{display:values.error ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {values.error}
    </div>
    </Fade>
  )

  const handleChange = event => {
    setValues({...values,error:'',name:event.target.value})
  }

  const newCategoryForm = () => (
    <Fade bottom>
      <Card>
        <form onSubmit={clickSubmit}>
          <div className="form-group">
            <label >Name</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={handleChange} 
              value={values.name} 
              autoFocus
              required
            />
            <button className="create-category">Create Category</button>
            <div className="go-back">
              <Link to="/admin/dashboard" ><span>Back to Dashboard</span></Link>
            </div>
          </div>
        </form>
      </Card>
    </Fade>
  )

  return(
    <React.Fragment>
      {values.loading && (<Modal show={values.loading}>
          <Loading/>
      </Modal>)}
      <div className="greet-user"><h4>{`G'day ${username}`}</h4></div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddCategory;