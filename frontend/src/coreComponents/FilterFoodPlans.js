import React, { useEffect,useState } from 'react';
import {getFoodPlansByDiesease,getFoodPlansByPrices} from './coreAPI';
import Card2 from '../shared/components/UIElements/Card2';
import {prices} from './fixedPrices';
import RadioBox from './RadioBox';

import './FilterFoodPlans.css';

const FilterFoodPlans = (props) => {
  const [values,setValues] = useState({
    error:'',
    foodPlans:[],
    skip:0,
    limit:6,
    filteredResults:[]
  })

  const [myfilters,setMyFilters] = useState({
    filters:{price:[]}
  })

  const{foodPlans,error,skip,limit,filteredResults} = values;

  // const loadFoodPlans = diseaseId=>{
  //   getFoodPlansByDiesease(diseaseId)
  //   .then(data => {
  //     if(data.error || data.message){
  //       setValues({...values,error:data.error||data.message})
  //     }else{
  //       setValues({...values,foodPlans:data.foodPlans})
  //     }
  //   })
  // } 

  const loadFilteredResults = (newFilters,diseaseId) => {
    // console.log('36',diseaseId);
    getFoodPlansByPrices(skip,limit,newFilters,diseaseId)
    .then(data => {
      console.log('38',data)
      if(data.error||data.message){
        setValues({...values,error:data.error||data.message})
      }else{
        setValues({...values,error:'',filteredResults:data.foodPlans})
      }
    })
    
  }


  useEffect(()=>{
    let diseaseId = props.match.params.diseaseId
    
    loadFilteredResults(myfilters.filters,diseaseId)
  },[])

  const handleFilters = (filters,filterBy) => {
    const newFilters = {...myfilters};
    
    if(filterBy == "price"){
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    let diseaseId = props.match.params.diseaseId
    loadFilteredResults(myfilters.filters,diseaseId);
    console.log('64',newFilters);
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for(let key in data){
      if(data[key]._id === parseInt(value)){
        array = data[key].array
      }
    }
    console.log('75',array);
    return array;
  }

  const showResults = (results) => (
    <div className="filterFoodPlans-header">
      {results.length > 0 ? <p> {results.length} FoodPlans found</p> : <p>No FoodPlans found</p>}  
    </div>
  )

 
  return(
    <div className="row">
      <div className="col-4">
        <div className="filterFoodPlans-header">
          <h4>Filter by prices</h4>
        </div>
          <RadioBox 
            prices={prices}
            handleFilters={filters => 
              handleFilters(filters,"price")  
            }
            />
      </div>
      <div className="col-8">
        {showResults(filteredResults)}
        {/* {JSON.stringify(myfilters)} */}
        {/* {JSON.stringify(foodPlans)} */}
        {/* {foodPlans.map((f,i) => (
          <Card2 key={i} foodPlan={f}/>
        ))} */}
        <div className="row">
          {filteredResults.map((f,i) => (
            <Card2 key={i} foodPlan={f} showFoodPlan={true}  showDescription={false} />
          ))}
        </div>

      </div>
    </div>
    )
}

export default FilterFoodPlans;