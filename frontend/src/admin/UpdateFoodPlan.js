import React,{useState,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';

import authAPI from '../authAPI/authAPI';
import adminAPI from './adminAPI';
import axios from 'axios';

import Fade from 'react-reveal/Fade';
import Card from '../shared/components/UIElements/Card';
import Loading from '../shared/components/UIElements/Loading';
import Modal from '../shared/components/UIElements/Modal';

import './UpdateFoodPlan.css';

const UpdateFoodPlan = (props) => {
  const [values,setValues] = useState({
    name:'',
    description:'',
    price:'',
    quantity:'',
    shipping:'',
    diseases:[],
    disease:'',
    photo: '',
    loading:false,
    error:'',
    createdFoodPlan : '',
    redirectToProfile:false,
    formData:'',
    success:false
  });

  const {
    name,description,
    price,quantity,shipping,
    diseases,disease,
    photo,loading,
    error,createdFoodPlan,
    redirectToProfile,formData,
    success
  } = values;

  const {username,userId,token} = authAPI.isAuthenticated();

  //load diseases and set formData

  // const initFoodPlan =  (foodPlanId) => {
  //   adminAPI.getFoodPlan(foodPlanId)
  //   .then( (data) => {
  //     if(data.error || data.message){
  //       setValues({...values,error:data.error||data.message})
  //     }else{
        
  //       //populate state
  //        setValues({...values,
  //       name:data.foodPlan.name,
  //       description:data.foodPlan.description,
  //       price:data.foodPlan.price,
  //       // disease:data.disease._id,
  //       shipping:data.foodPlan.shipping,
  //       quantity:data.foodPlan.quantity,
  //       formData: new FormData()
  //       })
  //       //  initDiseases();
  //     }
  //   })
  //   .then((data) => {
  //     if(data){
  //       initDiseases();
  //     }
  //   })
    
  // }

  // const initDiseases =  () => {
  //    adminAPI.getDiseases()
  //   .then( (data) => {
  //     if(data.error ||data.message){
  //       setValues({...values,error:data.error || data.message})
  //     }else{
  //        setValues({...values,diseases:data.diseases,formData:new FormData()})
  //     }
  //   })
  // };


  // useEffect(  () => {
  //   //  initDiseases()
  //   initFoodPlan(props.match.params.foodPlanId);
      
  // },[]);

  const fetchData = () => {
    let datafile1= adminAPI.getDiseases();
    let datafile2=adminAPI.getFoodPlan(props.match.params.foodPlanId);

    axios.all([datafile1,datafile2])
    .then( axios.spread((...allData) => {
      const allDataDisease = allData[0];
      const allDataFoodPlan = allData[1];

      // console.log('102',allDataDisease);
      // console.log('103',allDataFoodPlan);

      setValues({...values,
      name:allDataFoodPlan.foodPlan.name,
      price:allDataFoodPlan.foodPlan.price,
      quantity:allDataFoodPlan.foodPlan.quantity,
      shipping:allDataFoodPlan.foodPlan.shipping.shipping,
      description:allDataFoodPlan.foodPlan.description,
      diseases:allDataDisease.diseases,
      formData:new FormData()
    })

    }))
    .catch((data) => {
      if(data.error||data.message){
        setValues({...values,error:data.error||data.message})
      }
    })
  }

  useEffect( () => {
    fetchData();
  },[])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    values.formData.set(name,value);
    setValues({...values,[name]:value})
  }

  const clickSubmit = event  => {
    event.preventDefault();
    console.log('70',values);
    setValues({...values,error:'',loading:true})
    console.log('52',formData);
    adminAPI.updateFoodPlan(props.match.params.foodPlanId,userId,token,formData)
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error || data.message,success:false})
      }else{
        setValues({...values,
          name:'',description:'',
          price:'',quantity:'',
          photo:'',symptoms:'',
          loading:false,
          success:true,
          error:'',
          createdFoodPlan:data.foodPlan.name,
          redirectToProfile:true
        })
      }
    })

  }

  const showSuccess = () => (
    <Fade top>
    <div className="alter alert-success" style={{display:values.success ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {`${createdFoodPlan}`} foodPlan is updated
    </div>
    </Fade>
  )

  const redirectUser = () => {
    if(redirectToProfile){
      if(!error ){
        return <Redirect to="/" />
      }
    }
  }

  const showError = () => (
    <Fade top>
    <div className="alter alert-danger" style={{display:values.error ? '' : 'none' ,textAlign:"center",font:"inherit"}}>
      {values.error}
    </div>
    </Fade>
  )

  const newFoodPlanForm = () => (
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
            <label >Description</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={handleChange('description')} 
              value={description} 
              autoFocus
              required
            />
            <label >price</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={handleChange('price')} 
              value={price} 
              autoFocus
              required
            />
            <label >Disease</label>
            <br />
            <select  
              className="select-category" 
              onChange={handleChange('disease')} 
            >
              {/* <option value="5f1691ab5a440a2f8426a53d">cold</option>
              <option value="5f1693adc655fc88048e5d0b">cough</option> */}
              <option>Please Select</option>
                {diseases && diseases.map((d,i) => (
                  <option key={i} value={d._id}>{d.name}</option>
                ))}
            </select>
            <br />
            <label >Shipping</label>
            <br />
            <select  
              className="select-category" 
              onChange={handleChange('shipping')} 
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label >Quantity</label>
            <input 
              type="number" 
              className="form-control" 
              onChange={handleChange('quantity')} 
              value={quantity} 
              autoFocus
              required
            />

            <button className="create-category">Update FoodPlan</button>
            <div className="go-back">
              <Link to="/admin/dashboard" ><button  className="create-category">Back to Dashboard</button></Link>
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
          {newFoodPlanForm()}
          {redirectUser()}
        </div>
      </div>
    </React.Fragment>
  )
}

export default UpdateFoodPlan;