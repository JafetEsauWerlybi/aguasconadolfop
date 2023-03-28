import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Alert, Button } from 'react-bootstrap'
//import useAuth from '../../auth/useAuth'
import {useForm} from 'react-hook-form'
import swal from 'sweetalert';

import ChangePasswordResolver from '../../validations/ChangePasswordResolver';

export default function ChangePasswordModal({isOpen, close, id}) {
    const {reset} = useForm({resolver: ChangePasswordResolver});
    const [Password, setPassword] = useState('');
    
    const [verPassword, setVerPassword] = useState('password');
    const see = ()=> setVerPassword('text');
    const NotSee = ()=> setVerPassword('password');

    const Cambiar=()=>{
        if(Password===''||Password.length<8){
            swal('error', 'debes de llenar el campo de Password o que sea mayor de 8 caracteres','error')
        }else{
            const updatedUserData = { 
                password:Password
            }
            axios.put(`https://node-vercel-ahor.vercel.app/api/users/${id}`, updatedUserData)
            .then(response => {
            console.log('Usuario editado exitosamente:', response.data);
            
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
            <Alert variant='warning'>¿Estas seguro de editar tu contraseña?<b> RECUERDALA BIEN</b></Alert>
            
            <input type={verPassword} id="form2Example27" className="form-control form-control-lg" value={Password} onChange={(e)=> {setPassword(e.target.value)}}/>
            <label className="form-label" htmlFor="form2Example27">Password/Contraseña</label>
            <br></br>
            <button onClick={see} className="btn btn-primary btn-lg btn-block m-2">Ver Password</button>
            <button onClick={NotSee} className="btn btn-primary btn-lg btn-block">Ocultar Password</button>   
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='warning' onClick={Cambiar}>Editar</Button>
        </Modal.Footer>
    </Modal>
  )
}
