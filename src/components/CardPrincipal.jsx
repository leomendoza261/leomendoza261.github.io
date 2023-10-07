import React from 'react';


const CardPrincipal = ({ titulo, fecha, data, data2, data3, data4, icono, factor}) => {
    return (
        <div className="card bg-transparent border border-0 text-white" >
            <h5>{titulo}</h5>
            <p>{fecha}</p>
            <div className='row'>
                <img src={icono} alt="" srcset="" height={200} width={200}/>
                <p className='fs-4'>{data3}</p>
            </div>
            <div className='row'>
                <div className='col-6 align-items-center'>
                    <div className="card-body">
                        <p className="card-text fs-3 fw-medium">{data} {data2}</p>
                    </div>
                </div>
                <div className='col-6 d-flex align-items-center'>
                    <div className="progress w-75" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-warning " style={{ width: factor + "%" }}></div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <p className='fs-6 fw-lighter'>sensacion termica: {data4} {data2}</p>
            </div>
            
        </div>
    )
}

export default CardPrincipal;
