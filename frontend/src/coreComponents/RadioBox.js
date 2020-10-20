import React,{useState,useEffect} from 'react';

import './RadioBox.css';

const RadioBox = ({prices,handleFilters}) => {
  const [value,setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  }

  return(
      prices.map((p,i) => (
      <div  key={i} className="filterPrices">
        <input
           onChange={handleChange} 
           value={p._id} type="radio" 
           className="mr-2 ml-4"
           name={p}
           />
        <label className="form-check-label">{p.name}</label>
      </div>
    ))
      
  )
}

export default RadioBox;