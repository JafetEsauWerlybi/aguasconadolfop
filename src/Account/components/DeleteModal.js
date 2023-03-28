import axios from 'axios'
import React from 'react'
import { Modal, Alert, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import useAuth from '../../auth/useAuth'

export default function DeleteModal({isOpen, close, id}) {
    
    const {logout} = useAuth()
    

    const handleDelete=()=>{
        const url = `https://node-vercel-ahor.vercel.app/api/users/${id}`;
        axios.delete(url)
        .then(response => {
            //console.log('Usuario eliminado con éxito');
            swal('Vaya, ya te juiste', 'Usuario eliminado con éxito', 'warning'); 
            logout()
        })
        .catch(error => {
            console.error(error);
        });
    }
    return (
    <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Eliminar mi cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Alert variant='danger'>¿Estas seguro de ELIMINAR tu cuenta?<b> TODOS TUS DATOS SE PERDERAN </b></Alert>
        <input value={id}></input>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='danger' onClick={handleDelete} >Eliminar</Button>
        </Modal.Footer>
    </Modal>
  )
}
