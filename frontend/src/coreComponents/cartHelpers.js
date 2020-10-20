export const addItem = (item,next) => {
  console.log('2',item);
  let cart = [];
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    item && (cart.push({
      ...item,
      count:1
    })
    )
    console.log('12',cart);
    //array.from() creates a new array
    //we want to create a new array using new set
    //so new set we are going to map through the cart
    (cart.length > 0) && (cart = Array.from(new Set(cart.map( f => f._id))).map( id => {
      return cart.find(f => f._id === id);
    }))

    localStorage.setItem('cart',JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
}

export const getCart = () => {
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      //console.log('38',JSON.parse(localStorage.getItem('cart')));
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
}

export const updateCart = (foodPlanId,count ) => {
  let cart=[];
  if(typeof window!== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((f,i) => {
      if(f._id === foodPlanId){
        console.log('53',f);
        cart[i].count = count;
        console.log('55',f);
      }
    })

    localStorage.setItem('cart',JSON.stringify(cart));
  }

}

export const removeItem = (foodPlanId ) => {
  let cart=[];
  if(typeof window!== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((f,i) => {
      if(f._id === foodPlanId){
        cart.splice(i,1);
      }
    })

    localStorage.setItem('cart',JSON.stringify(cart));
  }
  return cart;

}

export const emptyCart = next => {
  if(typeof window !== 'undefined'){
    localStorage.removeItem('cart')
    next();
  }
}