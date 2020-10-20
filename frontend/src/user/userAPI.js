const getUser = (userId,token) => {
  return fetch(`http://localhost:5000/api/user/${userId}`,{
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

const updateUser = (userId,token,user) => {
  return fetch(`http://localhost:5000/api/user/${userId}`,{
    method:"PATCH",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json',
      Authorization : `Bearer ${token}`
    },
    body:JSON.stringify(user)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

const updateUserInLocalStorage = (user,next) =>{
  console.log('37',user);
  if(typeof window !== 'undefined'){
    if(localStorage.getItem("jwt")){
      let auth=JSON.parse(localStorage.getItem("jwt"))
      console.log('41',auth)
      auth.username = user.username;
      auth.email = user.email;
      auth.password = user.password;
      localStorage.setItem('jwt',JSON.stringify(auth))
      next();
    }
  }
}

const getPurchaseHistory = (userId,token) => {
  return fetch(`http://localhost:5000/api/orders/by/user/${userId}`,{
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

// const purchaseHistory = history => {
//   return (
//       <div className="card mb-5">
//           <h3 className="card-header">Purchase history</h3>
//           <ul className="list-group">
//               <li className="list-group-item">
//                   {history.map((h, i) => {
//                       return (
//                           <div>
//                               <hr />
//                               {h.products.map((p, i) => {
//                                   return (
//                                       <div key={i}>
//                                           <h6>Product name: {p.name}</h6>
//                                           <h6>Product price: ${p.price}</h6>
//                                           <h6>
//                                               Purchased date:{" "}
//                                               {moment(p.createdAt).fromNow()}
//                                           </h6>
//                                       </div>
//                                   );
//                               })}
//                           </div>
//                       );
//                   })}
//               </li>
//           </ul>
//       </div>
//   );
// };

exports.getPurchaseHistory = getPurchaseHistory;
exports.updateUserInLocalStorage = updateUserInLocalStorage
exports.getUser = getUser;
exports.updateUser = updateUser;
