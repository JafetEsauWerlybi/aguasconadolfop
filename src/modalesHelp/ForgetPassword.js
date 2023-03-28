import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Alert, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import swal from 'sweetalert';

import ChangePasswordResolver from '../validations/ChangePasswordResolver';

export default function ForgetPasswordModal({isOpen, close, Email}) {

    const {reset} = useForm({resolver: ChangePasswordResolver});
    const [Password, setPassword] = useState('');
    const [Respuesta, setRespuesta] = useState('');

    const [bandera, setBandera] = useState('none');
    const [bandera2, setBandera2] = useState('block');
    
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
            axios.put(`https://node-vercel-ahor.vercel.app/api/users/contraU/${Email}`, updatedUserData)
            .then(response => {
            console.log('Usuario editado exitosamente:', response.data);
                swal('Listo', 'ahora ingresa con tu nueva contraseña', 'success');
                window.location.reload();
            })
            .catch(error => {
            console.error('Error al editar usuario:', error);
            });
        }
    } 
    const verificarRespuesta= async()=>{
        if(Respuesta===''){
        swal('Error', 'Rellena los campos papu', 'error')
        }else{
        try{
            const envia =  await fetch('https://node-vercel-ahor.vercel.app/api/users/verificarRes',{
                method:'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                email:Email,
                respuesta:Respuesta
                })
            })
            const data = await envia.json()
            if(data.message==='Respuesta correcta'){
            swal('ta bien', 'ya bien','success');
                setBandera('block');
                setBandera2('none');
            }else{
            
            swal('Error en la respuesta', 'Tu respuesta no es correcta, verificala', 'error');
                
            }
        
        }catch (error){
            console.error(error)
        }
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
            <Modal.Title>Recuperar/Editar mi contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label className="form-label" htmlFor="">Recuerda que a este correo que intentas entrar</label>
            <h5 className="form-label" htmlFor="">{Email}</h5>
            
            <label className="form-label" >Correo</label>
            <Alert variant='warning' style={{display: bandera2}}>Ingresa la respuesta secreta a la pregunta del registro<b> La recuerdas, ¿Verdad?</b></Alert>
            <input type='text' style={{display:bandera2}} id="respuesta" className="form-control form-control-lg" value={Respuesta} onChange={(e)=> {setRespuesta(e.target.value)}}/>
            <label className="form-label"style={{display:bandera2}} htmlFor="respuesta">Respuesta secreta</label>
            

            <Alert variant='warning' style={{display:bandera}}>¿Estas seguro de editar tu contraseña?<b> RECUERDALA BIEN</b></Alert>

            <input style={{display:bandera}} type={verPassword} id="form2Example27" className="form-control form-control-lg" value={Password} onChange={(e)=> {setPassword(e.target.value)}}/>
            <label className="form-label" htmlFor="form2Example27" style={{display:bandera}}>New Password/Nueva Contraseña</label>
            <br></br>
            <button onClick={see} className="btn btn-primary btn-sm btn-block m-2" style={{display:bandera}}>Ver Password</button>
            <button onClick={NotSee} className="btn btn-primary btn-sm btn-block" style={{display:bandera}}>Ocultar Password</button>   
        </Modal.Body>
        <Modal.Footer>
            <button onClick={verificarRespuesta} className="btn btn-primary btn-sm btn-block m-2" style={{display:bandera2}}>Verificar</button>
            <Button variant='dark'  onClick={close} style={{display:bandera}}>Cancelar</Button>
            <Button variant='warning' onClick={Cambiar} style={{display:bandera}}>Editar</Button>
        </Modal.Footer>
    </Modal>
  )
}
