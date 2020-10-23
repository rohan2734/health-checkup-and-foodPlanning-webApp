import React,{useState,useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel'

import {getDiseasesByLimit} from './coreAPI';

import Card2 from '../shared/components/UIElements/Card2';

import './Home.css';

const Home = () => {
  const [values,setValues] = useState({
    diseasesByLimit:[],
    error:'',
    limit:''
  })

  const {diseasesByLimit,error,limit} = values;

  const loadDiseasesByLimit = () => {
    getDiseasesByLimit('limit')
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error || data.message})
      }else{
        setValues({...values,diseasesByLimit: data.diseases})
      }
    })
  }

  useEffect(() => {
    loadDiseasesByLimit()
  },[])

  const carousel = () => (
    <div>  
      <div className='container-fluid' >  
        <div className="row title" style={{ marginBottom: "20px" }} >  
        </div>  
        </div>  
        <div className='container-fluid' >
          <div className="row">
            <div className="col-8 offset-2">  
              <Carousel interval={2000} keyboard={false} pauseOnHover={true} className="carousel ">  
                <Carousel.Item style={{'height':"600px"}}  className="carousel-item">  
                  <img style={{'height':"500px"}}  
                    className="d-block w-100"  
                    src={'assets/img/img1.jpg'}
                    alt="1st "  
                  />  
                  {/* <Carousel.Caption className="carousel-caption">  
                    <h3>First Demo </h3>  
                  </Carousel.Caption>   */}
                </Carousel.Item  >

                <Carousel.Item style={{'height':"600px"}} className="carousel-item">  
                  <img style={{'height':"500px"}}  
                    className="d-block w-100"  
                    src={'assets/img/img2.jpg'}
                    alt="2nd " 
                  />  
                  {/* <Carousel.Caption className="carousel-caption">  
                    <h3>Second Demo</h3>  
                  </Carousel.Caption>   */}
                </Carousel.Item>

                <Carousel.Item style={{'height':"600px"}} className="carousel-item">  
                  <img style={{'height':"500px"}}  
                    className="d-block w-100 "  
                    src={'assets/img/img3.jpg'} alt="3rd"  />  
                  {/* <Carousel.Caption className="carousel-caption">  
                    <h3>Third Demo</h3>  
                  </Carousel.Caption>   */}
                </Carousel.Item>  
              </Carousel>
            </div>
        </div>  
      </div>  
    </div>
  )

  const showDiseases = () => (
    <div className="container-fluid">
      <div className="home-header">
        <h2>Diseases</h2>
      </div>
      <div className="row">
        {diseasesByLimit && diseasesByLimit.map((d,i) =>(
          <Card2 key={i} disease={d} showViewFoodPlanButton={false}/>
        ))}
      </div>
    </div>
  )

  return(
    <React.Fragment>
      {carousel()}
      {showDiseases()}
    </React.Fragment>
    )  
}

export default Home;