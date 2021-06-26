import Imagen from './Imagen'
import Error from './Error';

const ListadoImagenes = ({imagenes}) => {

    return (
        <div className="col-12 p-5 row">
           
            {imagenes.map(imagen => (
                <Imagen 
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
    );
};

export default ListadoImagenes;