import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Alert, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import swal from 'sweetalert';

import ChangePasswordResolver from '../validations/ChangePasswordResolver';

export default function ChangeAccountAdmin({isOpen, close, id, Nombre, UserName, Email, Password, Telefono, Respuesta }) {
    const {reset} = useForm({resolver: ChangePasswordResolver});
    const [nombre, setNombre]= useState('');
    const [telefono, setTelefono]= useState('');    
    const [respuesta, setRespuesta]= useState('');
    const [userName, setUserName]= useState('');
    
    
    
    const tele = parseInt(telefono);

    const Cambiar=()=>{
        if(nombre===''||userName===''||telefono===''||respuesta===''||telefono.length<10){
            swal('error', 'debes de llenar el campo de Password o que sea mayor de 8 caracteres','error')
        }else{
            const updatedUserData = { 
                name: nombre,
                userName:userName,
                respuesta: respuesta,
                tel: tele,
            }
            axios.put(`https://node-vercel-ahor.vercel.app/api/users/${id}`, updatedUserData)
            .then(response => {
                swal('Se modifico', 'Usuario modificado con éxito.', 'success'); 
            })
            .catch(error => {
            console.error('Error al editar usuario:', error);
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
            <Modal.Title>Editar mi contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Alert variant='warning'>¿Estas seguro de editar este usuario?<b> Notificale por un mensaje</b></Alert>
            
            <label htmlFor="nombre" className="form-label">Nombre Anterior: {Nombre}</label>
              <input type="text" name='nombre' id='nombre' className="form-control" value={nombre} onChange={(e)=> {setNombre(e.target.value)}}
              required
              ></input>
                
              <label htmlFor="UserName" className="form-label">Nombre de Usuario :{UserName}</label>
                <input type="text" name='UserName' id='UserName' className="form-control" value={userName} onChange={(e)=> {setUserName(e.target.value)}}
                required
                ></input>
            

            <label htmlFor="telefono" className="form-label">Telefono Anterior: {Telefono}</label>
            <input type="number" className="form-control" value={telefono} onChange={(e)=> {setTelefono(e.target.value)}}required></input>

            <label htmlFor="respuesta" className="form-label">Nombre de tu mascota Anterior: {Respuesta}</label>
                <input type="text" name='respuesta' id='respuesta' className="form-control" value={respuesta} onChange={(e)=> {setRespuesta(e.target.value)}}required></input>

                
                
            <br></br>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='warning' onClick={Cambiar}>Editar</Button>
        </Modal.Footer>
    </Modal>
  )
}
