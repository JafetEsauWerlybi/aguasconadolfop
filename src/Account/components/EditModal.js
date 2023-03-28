import React, { useEffect } from 'react'
import { Modal, Alert, Button, Form } from 'react-bootstrap'
//import useAuth from '../../auth/useAuth'
import {useForm} from 'react-hook-form'
import ChangePasswordResolver from '../../validations/ChangePasswordResolver';

export default function EditModal({isOpen, close}) {
    const {handleSubmit, register, formState: {errors}, reset} = useForm({resolver: ChangePasswordResolver});
    //const {logout} = useAuth()
    const onSubmit=(formData)=>{
        alert("cambiando password")
    }
    useEffect(()=>{
        if(!isOpen){
            reset()
        }
    }, [isOpen, reset])

    return (
    <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Editar mi cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Alert variant='success'>¿Estas seguro de editar tu cuenta?<b> RECUERDA QUE ESTOS DATOS CAMBIAN PERMANENTEMENTE</b></Alert>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Form.Group>
                    <Form.Label>
                        Ingresa la nueva contraseña papu
                    </Form.Label>
                    <Form.Control
                        type= "text"
                        placeholder='Ingrese su nueva contraseña'
                        {...register('password')}
                    />
                    {errors?.password &&(
                        <Form.Text>
                            <Alert variant='danger'>{errors.password.message}</Alert>
                        </Form.Text>
                    )}

                </Form.Group>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={close}>Cancelar</Button>
            <Button variant='warning' onClick={handleSubmit(onSubmit)}>Editar cuenta</Button>
        </Modal.Footer>
    </Modal>
  )
}
