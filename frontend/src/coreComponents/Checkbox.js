import React,{useState,useEffect} from 'react';
import './Checkbox.css';

const Checkbox = ({categories,handleFilters}) => {
  const [checked,setChecked] = useState([]);

  const handleToggle = cId =>() => {
    //it will return the first element index if it finds anything, or it will return -1
    const currentCategoryId = checked.indexOf(cId);
    const newCheckedCategoryId = [...checked] 
    //if currently checked was not already in checked state -> push
    //else pull/take off
    if(currentCategoryId === -1){
      newCheckedCategoryId.push(cId)
    }else{
      newCheckedCategoryId.splice(currentCategoryId,1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  }


  return(
    categories.map((c,i) => (
      
      <li className="list-unstyled" key={i}>
        <div className="checkbox">
          <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="filter-input"/>
          <label >{c.name}</label>
        </div>
      </li>
    ))
  )
}
// className="filter-label"
export default Checkbox;
