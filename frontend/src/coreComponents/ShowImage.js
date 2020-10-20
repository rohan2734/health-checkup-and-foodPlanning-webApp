import React from 'react';

import './ShowImage.css';

const ShowImage = ({item,url}) =>(
  <div className="product-img">
    <img 
      className="mb-3" 
      src={`http://localhost:5000/api/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      />
  </div>

)

export default ShowImage;