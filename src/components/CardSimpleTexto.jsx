import React from 'react';


const CardSimple = ({ titulo, data, descripcion}) => {
    return (
        <div className="card bg-transparent border border-0 text-white" >
            <h5>{titulo}</h5>
            <div className='row'>
                <div className='col-6 align-items-center'>
                    <div className="card-body">
                        <p className="card-text fs-4 fw-medium">{data}</p>
                    </div>
                </div>
                <div className='col-6 d-flex align-items-center'>
                <div className="card-body">
                        <p className="card-text fs-6 fw-medium">{descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSimple;
