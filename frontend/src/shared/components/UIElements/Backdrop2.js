import React from 'react';

import  './Backdrop2.css';

const Backdrop2 = (props) => (
    props.show ? <div className="Backdrop2"></div> : null
);

export default Backdrop2;