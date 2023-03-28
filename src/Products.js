import React, { useEffect, useState } from 'react'
import useModal from './hooks/useModal';
import Comprar from './modalesHelp/Comprar';

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [Id, setId] = useState('');
  const [Nombre, setNombre]= useState('');
  const [Precio, setPrecio]= useState('');
  const [Imagen, setImagen] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Existencias, setExistencias] = useState('');
  const [Categoria, setCategoria] = useState('');

  const [isOpenComprar, openComprar, closeComprar] = useModal();
  

  function getProductDetails(id){
    fetch(`https://node-vercel-ahor.vercel.app/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setId(data._id);
          setNombre(data.nombre);
          setPrecio(data.precio);
          setImagen(data.Imagen);
          setDescripcion(data.Descripcion);
          setExistencias(data.Existencias);
          setCategoria(data.categoria);
          openComprar()
        });
    

  }
  useEffect(() => {
    async function fetchData() {
      fetch('https://node-vercel-ahor.vercel.app/api/products')
        .then(response => response.json())
        .then(data => setProductos(data));
    } fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
    <div class="container_all" id="container__all">
        <div class="cover">

            <div class="bg_color"></div>
            <div class="wave w1"></div>
            <div class="wave w1"></div>
            
            <div class="container__cover">
            <h1>Vista de productos</h1>
            <div class="container__info">  
                
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
    <div className='row' style={{maxWidth:'100%'}}>
    {productos.map(producto => (
      
      <div className="card m-5" style={{maxWidth: '365px',
      paddingBottom: '40px',
      justifycontent: 'center', backgroundImage:'linear-gradient(to bottom, rgba(0, 0, 0, .8),rgba(50, 50, 50, .8)),url(https://media.tenor.com/VJK52Qy57moAAAAC/agua-movimento.gif)'}}> 
            <div class="card c2" style={{width: '90%',position: 'relative',textAlign:'center',}}>
                <div class="icon"tyle={{maxWidth: '200px',
                height:'100%'}} >
                <img id='icon' alt='prods' src={producto.Imagen} style={{maxWidth: '200px',
                height:'100%'}}></img>
                </div>
                <div class="info__description" style={{height:'280px'}}>  
                <p><b>Agua: </b>{producto.nombre}</p>
                <p><b>Precio: </b>{producto.precio}</p>
                <p><b>Descripcion: </b>{producto.Descripcion}</p>
                <p><b>Existencias: </b>{producto.Existencias}</p>
                <p><b>Categoria de agua: </b>{producto.categoria[0].nombre}</p>   
                    
                    <button className='btn btn-primary mb-1' style={{margin:'5px'}} onClick={()=>getProductDetails(producto._id)}>Comprar</button>
                </div>
            </div>
        </div>      
        ))}
        
            
        <Comprar
        isOpen={isOpenComprar}
        close={closeComprar}
        id = {Id}
        Nombre = {Nombre}
        Precio = {Precio}
        Imagen = {Imagen}
        Descripcion = {Descripcion}
        Existencias = {Existencias}
        Categoria = {Categoria}
    />
        </div>
       
        </>
        
        )
}

