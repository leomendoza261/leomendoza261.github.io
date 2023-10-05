import React from 'react';


const CardSimple = ({ titulo, data, descripcion}) => {
    return (
        <div class="card bg-transparent border border-0 text-white" >
            <h5>{titulo}</h5>
            <div className='row'>
                <div className='col-6 align-items-center'>
                    <div class="card-body">
                        <p class="card-text fs-4 fw-medium">{data}</p>
                    </div>
                </div>
                <div className='col-6 d-flex align-items-center'>
                <div class="card-body">
                        <p class="card-text fs-4 fw-medium">{descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSimple;
