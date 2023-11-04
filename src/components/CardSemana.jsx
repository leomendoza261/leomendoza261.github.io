import formatearFecha from "../helpers/fecha"

const CardSemana = ({dia, data, data2, Imagen1, Imagen2}) => {
    return(
        <div className="card bg-transparent border border-0 text-white">
            <h5>{formatearFecha(dia).split(',')[0]}</h5>
            <div className="card-body">
                <div className="row">
                    <div className="col-6 px-0">
                        {Imagen1}
                        <p >{data} Cº</p>
                    </div>
                    <div className="col-6 px-0">
                        {Imagen2}
                        <p >{data2} Cº</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardSemana