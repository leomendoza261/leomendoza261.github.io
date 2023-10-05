import React from 'react';


const CardSimple = ({ titulo, data, factor}) => {
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
                    <div class="progress w-75" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-warning " style={{ width: factor + "%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSimple;
