import React from 'react';
import ReactLoading from 'react-loading';
 

const Loader = () => {
    return (
        <div id="loader" className="d-flex justify-content-center m-20">
             <ReactLoading className="m-5 m-5" type='spinningBubbles' color='#f98169' height={'7%'} width={'7%'} />
        </div>
    )
}

export default Loader