import React,{useState, useEffect} from 'react';

import {getCategories,getDiseasesByParams} from './coreAPI';

import Card2 from '../shared/components/UIElements/Card2';
import Loading from '../shared/components/UIElements/Loading';
import Modal from '../shared/components/UIElements/Modal';
import './Search.css';

const Search = () => {
  const [values,setValues] = useState({
    categories:[],
    category:'',
    search:'',
    results:[],
    searched:false,
    error:'',
    loading:false
  })

  const {categories,category,search,results,
  searched,error,loading} = values;

  const loadCategories = ()=>{
    getCategories()
    .then(data => {
      if(data.error || data.message){
        setValues({...values,error:data.error|| data.message})
      }else{
        setValues({...values,categories:data.categories,error:''})
      }
    })
  }

  useEffect(() => {
    loadCategories()
  },[]);

  const searchData = () => {
    // console.log('38',search,category)
    setValues({...values,loading:true})
    if(search){
      getDiseasesByParams({search:search || undefined,category:category})
      .then(data => {
        if(data.error || data.message){
          setValues({...values,error:data.error || data.message,loading:false})
        }else{
          setValues({...values,results:data.diseases,searched:true,loading:false})
        }
      })
    }
    console.log(search,category);
  }

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  }

  const handleChange = name => event => {
      setValues({...values,[name]:event.target.value,searched:false})
  }

  const searchMessage = (searched,results) => {
    if(searched && results.length > 0){
      return `Found ${results.length} diseases`;
    }
    if(searched && results.length < 1){
      return `No diseases found`;
    }
  }

  const searchedDiseases = (results=[]) => (
    <div className="container">
      <br/>
      <h2 className="mt-4 mb-4">
        {searchMessage(searched,results)}
      </h2>
      <div className="row ">  
        {results.map((d,i) => (
          <Card2 key={i} disease={d} />
        ))}
      </div>
    </div>

  )

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="ALL">Pick Category</option>
              {categories.map((c,i) => (
                <option key={i} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <input 
          type="search" className="form-control" 
          onChange={handleChange('search')} 
          placeholder="search category"/>
        </div>
        <div className="btn input-group-append" style={{border:'none'}}>
          <button className="input-group-text">Search</button>
          <span class="glyphicon glyphicon-search"></span>
        </div>
      </span>
    </form>
  )

  return(
    <div className="row">
      {loading && (<Modal show={loading}>
          <Loading/>
      </Modal>)}
      <div className="container">{searchForm()}</div>
      <div className="container-fluid">
        {searchedDiseases(results)}
      </div>
    </div>
  )

  
}

export default Search;