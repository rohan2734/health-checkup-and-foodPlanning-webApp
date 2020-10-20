import React,{useState,useEffect,useCallback} from 'react';
import {Link} from 'react-router-dom';

import authAPI from '../authAPI/authAPI';
import adminAPI from './adminAPI';

import Fade from 'react-reveal/Fade';
import Card from '../shared/components/UIElements/Card';
import Loading from '../shared/components/UIElements/Loading';
import Modal from '../shared/components/UIElements/Modal';

import './AddDisease.css';

const AddDisease = () => {
  const [values,setValues] = useState({
    name:'',
    causes:'',
    symptoms:'',
    categories:[],
    category:'',
    photo: '',
    loading:false,
    error:'',
    createdDisease : '',
    redirectToProfile:false,
    formData:'',
    success:false
  });

  const {
    name,causes,
    symptoms,categories,
    category,redirectToProfile,
    formData,loading,
    error,createdDisease
  } = values;

  const {username,userId,token} = authAPI.isAuthenticated();

  //load categories and set formData

  const initCategories = useCallback(() => {
    adminAPI.getCategories()
    .then(data => {
      if(data.error ||data.message){
        setValues({...values,error:data.error || data.message})
      }else{
        setValues({...values,categories:data.categories,formData:new FormData()})
      }
    })
  },[]);

  useEffect(() => {
    initCategories();
  },[initCategories]);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name,value);
    setValues({...values,[name]:value})
  }

  const clickSubmit = event  => {
    event.preventDefault();
    setValues({...values,error:'',loading:true})
    console.log('52',formData);
    adminAPI.createDisease(userId,token,formData)
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error || data.message,success:false})
      }else{
        setValues({...values,
          name:'',causes:'',
          photo:'',symptoms:'',
          loading:false,
          success:true,
          error:'',
          createdDisease:data.disease.name
        })
      }
    })

  }

  const showSuccess = () => (
    <Fade top>
    <div className="alter alert-success" style={{display:values.success ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {`${createdDisease}`} disease is created
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

  const newDiseaseForm = () => (
    <Fade bottom>
      <Card>
        <form  className = "form" onSubmit={clickSubmit}>
          <p>Post photo</p>
          <div className="form-group">
            <label className="file-input">
              <input 
                type="file" 
                name="photo" 
                accept="image/*"
                onChange={handleChange("photo")}
                />
            </label>
          </div>
          <div className="form-group">
            <label >Name</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={handleChange('name')} 
              value={name} 
              autoFocus
              required
            />
            <label >Causes</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={handleChange('causes')} 
              value={causes} 
              autoFocus
              required
            />
            <label >Symptoms</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={handleChange('symptoms')} 
              value={symptoms} 
              autoFocus
              required
            />
            <label >Category</label>
            <br />
            <select  
              className="select-category" 
              onChange={handleChange('category')} 
            >
              <option>Please Select</option>
                {categories && categories.map((c,i) => (
                  <option key={i} value={c._id}>{c.name}</option>
                ))}
            </select>
            <br />

            <button className="create-category">Create Disease</button>
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
          {newDiseaseForm()}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddDisease;