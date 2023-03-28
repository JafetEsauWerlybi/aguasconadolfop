import React, { useEffect, useState } from 'react'
import useModal from '../hooks/useModal';
import ChangeModalProducto from './ModalesProductos/ChangeModalProducto';
import CreateProductModal from './ModalesProductos/CreateProductModal';
import DeleteProductModal from './ModalesProductos/DeleteProductModal';

export default function ProductsAdmin() {
    const [productos, setProductos] = useState([]);
    const [Id, setId] = useState('');
    const [Nombre, setNombre]= useState('');
    const [Precio, setPrecio]= useState('');
    const [Imagen, setImagen] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Existencias, setExistencias] = useState('');
    const [Categoria, setCategoria] = useState('');

    const [isOpenDeleteProductModal, openDeleteProductModal, closeDeleteProductModal] = useModal();
    const [isOpenChangeProductModal, openChangeProductModal, closeChangeProductModal] = useModal();
    const [isOpenCreateProductModal, openCreateProductModal, closeCreateProductModal] = useModal();

    function getProductDetails(id) {
        fetch(`https://node-vercel-ahor.vercel.app/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            setId(data._id);
            openDeleteProductModal()
        });
    }

    function getProductDetailsForEdit(id) {
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
            openChangeProductModal()
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
            <h1>Admin de productos</h1>
            <div class="container__info">  
                
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
        <div className='container text-center mt-5'>
            <div className="row m-5" style={{borderRadius:"20px", backgroundColor:"#eee"}}>
                <div className='col'>
                    <button className='btn btn-success btn-lg btn-block m-3' onClick={openCreateProductModal}>Agregar Un nuevo producto</button>
                </div>
            </div>
        </div>
        <div className='row' style={{maxWidth:'100%'}}>
    {productos.map(producto => (
      
        <div className="card m-5" style={{maxWidth: '365px',
        paddingBottom: '40px',
        justifycontent: 'center', backgroundImage:'linear-gradient(to bottom, rgba(0, 0, 0, .8),rgba(50, 50, 50, .8)),url(https://media.tenor.com/VJK52Qy57moAAAAC/agua-movimento.gif)'}}> 
        <div class="card c2" style={{maxWidth: '100%',position: 'relative',textAlign:'center',}}>
                <div class="icon">
                <img id='icon' alt='prods' src={producto.Imagen} style={{maxWidth:'100%'}}></img>
                </div>
                <div class="info__description" style={{height:'100%'}}>  
                    <p><b>Agua: </b>{producto.nombre}</p>
                    <p><b>Precio: </b>{producto.precio}</p>
                    <p><b>Descripcion: </b>{producto.Descripcion}</p>
                    <p><b>Existencias: </b>{producto.Existencias}</p>
                    <p><b>Categoria de agua: </b>{producto.categoria[0].nombre}</p>      
                <button className='btn btn-primary btn-sm btn-block'  onClick={()=>getProductDetailsForEdit(producto._id)}>Editar producto</button>
                <button className='btn btn-primary btn-sm btn-block m-1'  onClick={()=>getProductDetails(producto._id)} >Eliminar producto</button>
                </div>
            </div>
        </div> 
          
      ))}
      </div>
        <DeleteProductModal
            isOpen={isOpenDeleteProductModal}
            close = {closeDeleteProductModal}
            id = {Id}
        />
        <ChangeModalProducto
            isOpen={isOpenChangeProductModal}
            close = {closeChangeProductModal}
            id = {Id}
            Nombre = {Nombre}
            Precio = {Precio}
            Imagen = {Imagen}
            Descripcion = {Descripcion}
            Existencias = {Existencias}
            Categoria = {Categoria}
        />
        <CreateProductModal
            isOpen={isOpenCreateProductModal}
            close = {closeCreateProductModal}
            />
            
        </>
    
            )
}


