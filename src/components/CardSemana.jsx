import formatearFecha from "../helpers/fecha"
import traduccionClima from "../data/weatherData.json"

const CardSemana = ({dia,code, data, data2, Imagen1, Imagen2}) => {
    return(
        <div className="">
            <h5>{formatearFecha(dia).split(',')[0]}</h5>
                <div className="row ">
                    <div className="col-12">
                        <img src={traduccionClima[code]?.image_src} alt="" height={100} width={100}/>
                        <p>{traduccionClima[code]?.name}</p>
                    </div>
                </div>
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
    )
}

export default CardSemana