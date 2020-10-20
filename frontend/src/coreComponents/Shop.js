import React,{useState,useEffect,useCallback} from 'react';

import axios from 'axios';
import {getCategories,getFilteredDiseases}from './coreAPI';
import Checkbox from './Checkbox';
import Search from './Search';

import Card2 from '../shared/components/UIElements/Card2';
import Modal from '../shared/components/UIElements/Modal';
import Loading from '../shared/components/UIElements/Loading';
import './Shop.css';

const Shop = () => {

  const [myFilters,setMyFilters] = useState({
    filters: {category:[]}
  })
  const [values,setValues] = useState({
    categories:[],
    error:'',
    skip:0,
    limit:6,
    size:0,
    filteredResults:[],
    loading:false
  });

  const {error,categories,filters,skip,size,limit,filteredResults,loading} = values;

  // const initCategories = (() => {
  //   getCategories()
  //   .then(data => {
  //     if(data.error ||data.message){
  //       setValues({...values,error:data.error || data.message})
  //     }else{
  //       setValues({...values,categories:data.categories});
  //     }
  //   })

  // });

  // const loadFilteredDieseases =  (newFilters) => {
    
  //   // console.log('39',newFilters);
  //   setValues({...values,loading:true});
  //   getFilteredDiseases(skip,limit,newFilters)
  //   .then(data => {
  //     if(data.error || data.message){
  //       setValues({...values,error:data.error || data.message,loading:false})
  //     }else{
  //       setValues({...values,filteredResults:data.diseases,size:data.size,loading:false})
  //     }
  //   })
  // }

  const loadMore = () => {
    let toSkip = skip + limit;
    setValues({...values,loading:true});
    getFilteredDiseases(toSkip,limit,myFilters.filters)
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error || data.message,loading:false})
      }else{
        setValues({...values,filteredResults:[...filteredResults,...data.diseases],size:data.size,skip:0,loading:false})
      }
    })
  }
  //

  const loadMoreButton = () => {
    return (
      size>0  &&  size >= limit  && (
        <button onClick={loadMore} className="btn btn-warning mb-5">LOAD MORE</button>
      )
    )
  }
  const handleFilters = (filters,filterBy) => {
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;
    
    //  loadFilteredDieseases(myFilters.filters)
    fetchData(myFilters.filters)
     setMyFilters(newFilters)
    // setValues({...values,filters:filters})
  }

  const fetchData = (newFilters) => {
    let datafile1= getCategories()
    let datafile2=getFilteredDiseases(skip,limit,newFilters)

    setValues({...values,loading:true})
    axios.all([datafile1,datafile2])
    .then( axios.spread((...allData) => {
      const allDataCategories = allData[0];
      const allDataDiseases = allData[1];

      setValues({...values,
        filteredResults:allDataDiseases.diseases,
        size:allDataDiseases.size,
        categories:allDataCategories.categories,
        loading:false,
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
    // loadFilteredDieseases(skip,limit,myFilters.filters) 
    // initCategories();
  
  },[]);


 
  return (
    <React.Fragment>
      {loading && (<Modal show={loading}>
          <Loading/>
      </Modal>)}
      <Search />
      <div className="row">
        <div className="col-4">
          <div className="shop-header">
            <h4>Filter by Categories</h4>
          </div>
          <ul>
            <Checkbox handleFilters={filters => handleFilters(filters,'category')}   categories={categories}/>
          </ul>
        </div>
        <div className="col-8">
          {/* {JSON.stringify(myFilters)} */}
          {/* {JSON.stringify(filteredResults)} */}
          <div className="shop-header">
            <h2 className="mb-4">Diseases</h2>
          </div>
          <div className="row">
            {console.log(filteredResults)}
            {filteredResults.map((d,i)=>(
                <Card2 key={i} disease={d} showViewFoodPlanButton={false}/>

            ))}
            
          </div>
          <hr/>
            {loadMoreButton()}
          
        </div>
      </div>
    </React.Fragment>
  )
}

export default Shop;