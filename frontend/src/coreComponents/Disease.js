import React,{useState,useEffect} from 'react';

import axios from 'axios';
import { getDisease,getRelatedDisease } from './coreAPI';
import Card2 from '../shared/components/UIElements/Card2';

import './Disease.css';

const Disease = (props) => {
  const [values,setValues] = useState({
    disease:'',
    error:'',
    relatedDiseases:[]
  })

  const {disease,relatedDiseases} = values;


  const fetchData = () => {
    let datafile1= getDisease(props.match.params.diseaseId);
    let datafile2=getRelatedDisease(props.match.params.diseaseId);

    axios.all([datafile1,datafile2])
    .then( axios.spread((...allData) => {
      const allDataDisease = allData[0];
      const allDataRelatedDisease = allData[1];

      console.log('102',allDataDisease);
      console.log('103',allDataRelatedDisease);

      setValues({...values,
        disease:allDataDisease.disease,
        relatedDiseases:allDataRelatedDisease.relatedDiseases
      })

    }))
    .catch((data) => {
      if(data.error||data.message){
        setValues({...values,error:data.error||data.message})
      }
    })
  }

  useEffect(()=>{
    fetchData();
    // const diseaseId = props.match.params.diseaseId;
    // loadSingleDisease(diseaseId);
  },[]);

  return(
    <React.Fragment>
      {/* <h2 className="mb-4">{disease && disease.name}</h2> */}
      
        <div className="row ">
          <div className="disease-view-header">
            <h4>Diseases</h4>
          </div>
          {/* <div className="disease-view-header" style={{width:'34%'}}>
            <h4>Related Dieseases</h4>
          </div> */}
            
          <div className="container-fluid">          
            {disease && <Card2 
              disease={disease} 
              showViewDiseaseButton={false} 
              showViewFoodPlanButton={true}
              style={{width:'1040px'}} />}
          </div>
          <div className="col-4">
          
            {relatedDiseases &&relatedDiseases.map((rd,i) => (
                <Card2 key={i} disease={rd}/>
            ))}
          </div>
        </div>
    </React.Fragment>
  )

};

export default Disease;