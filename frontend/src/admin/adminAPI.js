
const createCategory = (userId,token,category) => {
  return fetch(`http://localhost:5000/api/category/create/${userId}`,{
    method:'POST',
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization:`Bearer ${token}`
    },
    
    body:JSON.stringify(category)
  })
  .then(response => {
    console.log('15',response);
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
};

const createDisease = (userId,token,disease) => {
  return fetch(`http://localhost:5000/api/disease/create/${userId}`,{
    method:'POST',
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    
    body:disease
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
};

//for populating categories while adding diseases, because there we provided a option to choose a category
const getCategories = () => {
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

const createFoodPlan = (userId,token,foodPlan) => {
  console.log('54',foodPlan);
  return fetch(`http://localhost:5000/api/foodPlan/create/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:foodPlan
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
};

const getDiseases = () => {
  return fetch(`http://localhost:5000/api/diseases`,{
    method:'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
};

const listOrders = (userId,token) => {
  return fetch(`http://localhost:5000/api/order/list/${userId}`,{
    method:'GET',
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    }
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

const getStatusValues = (userId,token) => {
  return fetch(`http://localhost:5000/api/order/status-values/${userId}`,{
    method:'GET',
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    }
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

const updateOrderStatus = (userId,token,orderId,status) => {
  return fetch(`http://localhost:5000/api/order/${orderId}/status/${userId}`,{
    method:'PATCH',
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({status,orderId})
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

/**
 * to perfomr crud on foodPlans
 * get all foodPlans
 * get a single foodPlan
 * update single foodPlan
 * delete single foodPlan
 */

 const getFoodPlans = () => {
  return fetch(`http://localhost:5000/api/foodPlans?limit=undefined`,{
    method:'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

const deleteFoodPlan = (foodPlanId,userId,token) => {
  return fetch(`http://localhost:5000/api/foodPlan/${foodPlanId}/${userId}`,{
    method:'DELETE',
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

const getFoodPlan = (foodPlanId) => {
  return fetch(`http://localhost:5000/api/foodPlan/${foodPlanId}`,{
    method:'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}

const updateFoodPlan = (foodPlanId,userId,token,foodPlan) => {
  return fetch(`http://localhost:5000/api/foodPlan/${foodPlanId}/${userId}`,{
    method:'PATCH',
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:foodPlan
  })
  .then(response => {
    return response.json();
  })
  .catch(err =>{
    console.log(err);
  });
}


exports.updateFoodPlan = updateFoodPlan;
exports.getFoodPlan = getFoodPlan;
exports.deleteFoodPlan = deleteFoodPlan;
exports.getFoodPlans = getFoodPlans;
exports.updateOrderStatus = updateOrderStatus;
exports.getStatusValues= getStatusValues;
exports.listOrders = listOrders;
exports.getDiseases = getDiseases;
exports.createFoodPlan = createFoodPlan;
exports.getCategories = getCategories;
exports.createDisease = createDisease;
exports.createCategory = createCategory;