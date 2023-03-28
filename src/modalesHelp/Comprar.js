import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import swal from 'sweetalert';
import ChangePasswordResolver from '../validations/ChangePasswordResolver';

export default function Comprar({isOpen, close, id, Nombre, Precio, Imagen, Descripcion, Existencias, Categoria }) {
    const {reset} = useForm({resolver: ChangePasswordResolver});
    const [cantidadAComprar, setCantidadAComprar]= useState(0);    
    const [Total, setTotal]= useState(0);        
    
    const exis = parseInt(Existencias-cantidadAComprar);
    const Sumar =()=>{
        if(cantidadAComprar>=Existencias)swal('Oops','No puedes comprar mas de la cantidad en existencia','warning');
        else {
            setCantidadAComprar(cantidadAComprar+1)
            setTotal(Precio*(cantidadAComprar+1))
        };

    }
    const Restar =()=>{
        if(cantidadAComprar<=1) swal('Oops','No puedes comprar menos de 0 productos papu','warning');
        else {setCantidadAComprar(cantidadAComprar-1)
            setTotal(Total-Precio)
        };
        
    }
    const Rese=()=>setCantidadAComprar(1);
    const Cambiar=()=>{
        if(cantidadAComprar===0||Total===0){
            swal('error', 'debes de llenar el campo de Password o que sea mayor de 8 caracteres','error')
        }else{
            const updatedUserData = { 
                nombre: Nombre,
                precio:Precio,
                Imagen: Imagen,
                Descripcion: Descripcion,
                Existencias: exis,
                categoria: Categoria
            }
            axios.put(`https://node-vercel-ahor.vercel.app/api/products/${id}`, updatedUserData)
            .then(response => {
                swal('Comprado', 'Has comprado con exito este producto', 'success');
                close() 
            
            })
            .catch(error => {
            console.error('Error al editar usuario:', error);
            });
        }
    }

    useEffect(() => {
        if (close) {
          setTotal(0)
          setCantidadAComprar(0)
        }
      }, [close, reset]);

    return (
    <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Comprar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <img alt='producto' src={Imagen} style={{maxWidth:'400px', maxHeight:'400px'}}></img>
            <h6>Nombre:</h6>
            <h2>{Nombre}</h2>
                
            <h6 >Precio</h6>
            <h2>{Precio}</h2>
            
            <h6>Descripción</h6>
            <h2>{Descripcion}</h2>    

                <h6>Existencias</h6>
                <h2>{Existencias}</h2>
                

                <h6>Categoria</h6>
                <h2>{Categoria}</h2>
            <div className='container text-center'>
                <h6>Cantidad que compraras</h6>
                <h2>{cantidadAComprar}</h2>
                <Button variant='success' className='btn btn-md m-2' onClick={Sumar}>+</Button>
                <Button variant='light' className='btn btn-md m-2' onClick={Restar}>-</Button>
                <Button variant='danger' className='btn btn-md m-2' onClick={Rese}>x</Button>
                <h6>Total</h6>
                <h6>${Total}</h6>
                
            </div>
        </Modal.Body>
        <Modal.Footer>
            

            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='warning' onClick={Cambiar}>Comprar</Button>
        </Modal.Footer>
    </Modal>
  )
}
