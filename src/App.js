import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes';
import {useState, useEffect} from 'react'
import Error from './components/Error';

function App() {

const [busqueda, setBusqueda] = useState('');
const [imagenes, setImagenes] = useState([]);
const [peticionVacia, setPeticionVacia] = useState(false);
const [paginaActual, setPaginaActual] = useState(1);
const [totalPaginas, setTotalPaginas] = useState(1);


useEffect(() =>{
  setPaginaActual(1)
}, [busqueda])


useEffect(() =>{
  const consultarApi = async() =>{
  
    if(busqueda === '')return
     
     const imagenesPorPagina = 30;
     const key = '22226360-5d60834bda32ce715b6d29956' ;
     const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per-page=${imagenesPorPagina}&page=${paginaActual}`

     const respuesta = await fetch(url);
     const resultado = await respuesta.json();
     
     if(resultado.total === 0 ){
      setPeticionVacia(true)
      return;
     }
     setPeticionVacia(false)
     setImagenes (resultado.hits)


     //calculo del total de paginas 
     const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
     setTotalPaginas(calcularTotalPaginas)

     //mover la pantalla hasta arriba luego de usar el paginador
     const jumbotron = document.querySelector('.jumbotron')
     jumbotron.scrollIntoView({behavior: 'smooth'})
     
     
  }
  
  consultarApi()
}, [busqueda, paginaActual])

//ir a la pag anterior
const paginaAnterior =( ) =>{
  const nuevaPaginaActual = paginaActual - 1
  if(nuevaPaginaActual === 0)return;
  setPaginaActual(nuevaPaginaActual)
}


//ir a la pag siguiente
const paginaSiguiente =( ) =>{
  const nuevaPaginaSiguiente = paginaActual +1
  if(nuevaPaginaSiguiente > totalPaginas)return;
  setPaginaActual(nuevaPaginaSiguiente)
}


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
      {peticionVacia && <Error mensaje="No hay coincidencias" />}
        <ListadoImagenes 
          imagenes = {imagenes}
        />
        {(paginaActual === 1) ? null : (
        <button className="bbtn btn-info mr-1" type="button" onClick={paginaAnterior}>
          &laquo; Anterior 
        </button>
        )}
        
        {(paginaActual !== totalPaginas) && (

        <button className="bbtn btn-info mr-1" type="button" onClick={paginaSiguiente}>
         Siguiente &raquo;
        </button>
        )}
      </div>
    </div> 
  
  );
}

export default App;
