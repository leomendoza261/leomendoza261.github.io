
const CardDouble = ({ titulo, data, Imagen1, Imagen2 }) => {
    return (
        <div class="card bg-transparent border border-0 text-white">
            <h5>{titulo}</h5>
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        {Imagen1}
                        <p className="fs-4 fw-medium"> {data[0]} </p>
                    </div>
                    <div className="col-6">
                        {Imagen2}
                        <p className="fs-4 fw-medium">{data[1]}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CardDouble;
