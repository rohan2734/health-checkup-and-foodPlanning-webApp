import React from 'react';

import  './Modal.css';
import Backdrop2 from '../UIElements/Backdrop2';

const Modal = props =>  {

  return (
    <React.Fragment>
      <Backdrop2 show={props.show} />
      <div
          className="Modal"
          style={{
              transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: props.show ? '1' : '0'
          }}>
          {props.children}
      </div>
    </React.Fragment>
  )
    
}

export default Modal;