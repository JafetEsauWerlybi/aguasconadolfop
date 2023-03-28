import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import swal from 'sweetalert';
import ChangePasswordResolver from '../../validations/ChangePasswordResolver';

export default function CreateProductModal({isOpen, close}) {
    const {reset} = useForm({resolver: ChangePasswordResolver});
    const [nombre, setNombre]= useState('');
    const [precio, setPrecio]= useState('');    
    const [imagen, setImagen]= useState(null);
    const [descripcion, setDescripcion]= useState('');
    const [existencias, setExistencias]= useState('');
    const [categoria, setCategoria]= useState('');
    
    
    
    const prec = parseInt(precio);
    const exis = parseInt(existencias);

    const Cambiar=()=>{
        if(imagen===''){
            swal('Error', 'Rellena los campos papu', 'error')
        }else{
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('precio', prec);
            formData.append('Imagen', imagen);
            formData.append('Descripcion', descripcion);
            formData.append('Existencias', exis);
            formData.append('categoria', categoria)

            // Hacer una solicitud POST a la ruta para agregar un nuevo producto
            fetch('https://api-rest-render.onrender.com/api/products2', {
            method: 'POST',
            body: formData
            })
            
            .then(response => response.json())
            .then(data => {
                console.log(data)
                swal('Se creo', 'Producto registrado con éxito.', 'success');
            })
            
            .catch(error => console.error(error));
        
        } 
    }
    useEffect(()=>{
        if(!isOpen){
            reset()
        }
    }, [isOpen, reset])

    return (
    <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Crear producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <label htmlFor="Imagen" className="form-label">Url de la imagen:</label>
        <input accept="image/*" type="file" className="form-control" defaultValue={imagen} onChange={(e)=> {setImagen(e.target.files[0]); console.log(e.target.files[0])}} required></input>

            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" name='nombre' id='nombre' className="form-control" value={nombre} onChange={(e)=> {setNombre(e.target.value)}}
            required
            ></input>
                
            <label htmlFor="precio" className="form-label">Precio:</label>
                <input type="number" name='precio' id='precio' className="form-control" value={precio} onChange={(e)=> {setPrecio(e.target.value)}}
                required
                ></input>
            

            

            <label htmlFor="descripcion" className="form-label">Descripcion:</label>
                <input type="text" name='descripcion' id='descripcion' className="form-control" value={descripcion} onChange={(e)=> {setDescripcion(e.target.value)}}required></input>

                <label htmlFor="existencias" className="form-label">Existencias</label>
                <input type="number" name='existencias' id='existencias' className="form-control" value={existencias} onChange={(e)=> {setExistencias(e.target.value)}}required></input>

                <label htmlFor="categoria" className="form-label">Categoria:</label>

                <select className="form-select" onChange={(e)=> {setCategoria(e.target.value)}}>
                    <option value="640e75fdb6591ec0d4e2a17e">Agua Natural</option>

                    <option value="640e75fdb6591ec0d4e2a17e">Agua Natural</option>
                    <option value="6416964e9dfeb8cf8cb39932">Stevia</option>
                    <option value="641696579dfeb8cf8cb39934">Azucar</option>
                </select>
                
            
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='warning' onClick={Cambiar}>Crear</Button>
        </Modal.Footer>
    </Modal>
)
}
