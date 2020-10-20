 const signin = (user) => {
  return fetch('http://localhost:5000/api/signin',{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body: JSON.stringify(user)
    
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
} 

const login = (user) => {
  console.log('20',user);
  return fetch('http://localhost:5000/api/login',{
    method:"POST",
    headers:{
      Accept:'application/json',
      "Content-Type":'application/json'
    },
    body: JSON.stringify(user)
    
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
}

//save user and token in localstorage
const authenticate = (data,next) => {
  
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt',JSON.stringify(data))
    //here in the callback u can redirect the user and set the state values to null
    next();
  }
}

const signout = (next) => {
  if(typeof window !== 'undefined'){
    localStorage.removeItem('jwt');
    //here in the callback u can redirect the user and set the state values to null
    next();
    return fetch('http://localhost:5000/api/signout',{
      method:'GET'
    })
    .then(response =>{
      console.log('signout',response)
    } )
    .catch(err => console.log(err));
  }
}

const isAuthenticated = () => {
  if(typeof window == 'undefined'){
    return false;
  }
  if(localStorage.getItem('jwt')){
    return JSON.parse(localStorage.getItem('jwt'))
  }else{
    return false
  }
}

//course(signup) -we(signin)
//course(signin)-we(login)
exports.isAuthenticated = isAuthenticated;
exports.signout =signout;
exports.authenticate = authenticate;
exports.login = login;
exports.signin = signin;