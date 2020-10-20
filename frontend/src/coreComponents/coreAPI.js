import queryString from "query-string";

export const getDiseasesByLimit = (limit) => {
  return fetch(`http://localhost:5000/api/diseases?limit=6`,{
    method:'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
};

export const getCategories = () => {
  return fetch(`http://localhost:5000/api/categories`,{
    method:'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

export const getFilteredDiseases = (skip,limit,filters={}) => {
  const data = {
    limit,skip,filters
  }
  
  return fetch('http://localhost:5000/api/diseases/by/search',{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body: JSON.stringify(data)
    
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const getDiseasesByParams= (params) => {
  
  const query = queryString.stringify(params)
  console.log(query);
  return fetch(`http://localhost:5000/api/diseases/search/?${query}`,{
    method:"GET",
    
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const getDisease = (diseaseId) =>{
  return fetch(`http://localhost:5000/api/disease/${diseaseId}`,{
    method:"GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const getRelatedDisease = (diseaseId) => {
  return fetch(`http://localhost:5000/api/diseases/related/${diseaseId}`,{
    method:"GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const getFoodPlansByDiesease = (diseaseId) => {
  return fetch(`http://localhost:5000/api/foodPlans/by/${diseaseId}`,{
    method:"GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const getFoodPlansByPrices = (limit,skip,filters,diseaseId) =>{
 console.log(diseaseId);
    const data = {
      limit,skip,filters
    }
    
    return fetch(`http://localhost:5000/api/foodPlans/by/search/${diseaseId}`,{
      method:"POST",
      headers:{
        Accept:'application/json',
        "Content-Type":'application/json'
      },
      body: JSON.stringify(data)
      
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const getFoodPlan = (foodPlanId) => {
  return fetch(`http://localhost:5000/api/foodPlan/${foodPlanId}`,{
    method:"GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}


export const getRelatedFoodPlans = (foodPlanId) => {
  return fetch(`http://localhost:5000/api/foodPlans/related/${foodPlanId}`,{
    method:"GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const getBraintreeClientToken = (userId,token) => {
  return fetch(`http://localhost:5000/api/braintree/getToken/${userId}`,{
    method:"GET",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization : `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const processPayment = (userId,token,paymentData) => {
  return fetch(`http://localhost:5000/api/braintree/payment/${userId}`,{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

export const createOrder = (userId,token,createOrderData) => {
  return fetch(`http://localhost:5000/api/order/create/${userId}`,{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization : `Bearer ${token}`
    },
    body: JSON.stringify({order:createOrderData})
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

