import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Alert, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import swal from 'sweetalert';
import useAuth from '../../auth/useAuth';
import ChangePasswordResolver from '../../validations/ChangePasswordResolver';

export default function ChangeModalProducto({isOpen, close, id, Nombre, Precio, Imagen, Descripcion, Existencias, Categoria }) {
    const {reset} = useForm({resolver: ChangePasswordResolver});

    const [nombre, setNombre]= useState('');
    const [precio, setPrecio]= useState('');    
    
    const [descripcion, setDescripcion]= useState('');
    const [existencias, setExistencias]= useState('');
    const [categoria, setCategoria]= useState('');
    const {logout} = useAuth();
    
    
    const prec = parseInt(precio);
    const exis = parseInt(existencias);

    const Cambiar=()=>{
        if(nombre===''||precio===''||descripcion===''||existencias===''||categoria===''){
            swal('error', 'debes de llenar el campo de Password o que sea mayor de 8 caracteres','error')
        }else{
            const updatedUserData = { 
                nombre: nombre,
                precio:prec,
                Imagen: Imagen,
                Descripcion: descripcion,
                Existencias: exis,
                categoria: categoria
            }
            axios.put(`https://node-vercel-ahor.vercel.app/api/products/${id}`, updatedUserData)
            .then(response => {
                swal('Se modifico', 'Producto modificado con éxito.', 'success'); 
            logout()
            })
            .catch(error => {
            console.error('Error al editar producto:', error);
            });
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
            <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Alert variant='warning'>¿Estas seguro de editar tu producto?</Alert>
            
            <label htmlFor="nombre" className="form-label">Nombre Actual: {Nombre}</label>
              <input type="text" name='nombre' id='nombre' className="form-control" value={nombre} onChange={(e)=> {setNombre(e.target.value)}}
              required
              ></input>
                
              <label htmlFor="precio" className="form-label">Precio Actual :{Precio}</label>
                <input type="text" name='precio' id='precio' className="form-control" value={precio} onChange={(e)=> {setPrecio(e.target.value)}}
                required
                ></input>
            

            

            <label htmlFor="descripcion" className="form-label">Descripcion actual: {Descripcion}</label>
                <input type="text" name='descripcion' id='descripcion' className="form-control" value={descripcion} onChange={(e)=> {setDescripcion(e.target.value)}}required></input>

                <label htmlFor="existencias" className="form-label">Existencias actuales: {Existencias}</label>
                <input type="text" name='existencias' id='existencias' className="form-control" value={existencias} onChange={(e)=> {setExistencias(e.target.value)}}required></input>

                <label htmlFor="categoria" className="form-label">Categoria actual: {Categoria}</label>
                <select className="form-select" onChange={(e)=> {setCategoria(e.target.value)}}>
                    <option value="640e75fdb6591ec0d4e2a17e">Agua Natural</option>
                    <option value="640e75fdb6591ec0d4e2a17e">Agua Natural</option>
                    <option value="6416964e9dfeb8cf8cb39932">Stevia</option>
                    <option value="641696579dfeb8cf8cb39934">Azucar</option>
                </select>
            <br></br>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='warning' onClick={Cambiar}>Editar</Button>
        </Modal.Footer>
    </Modal>
  )
}
