import React, { useEffect } from 'react'
import {Button, Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth'
import routes from '../helpers/routes';
import useModal from '../hooks/useModal';
import ChangePasswordModal from './components/ChangePassword';
import DeleteModal from './components/DeleteModal';


export default function Account() {
  const {user} = useAuth();
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenChangePasswordModal, openChangePasswordModal, closeChangePasswordModal] = useModal();
  
  const {logout} = useAuth()

  useEffect(() => {
    async function fetchData() {
     Account();
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
            <h1>Mis datos, mi cuenta</h1>
            <div class="container__info">  
                
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
        <Container className='text-center mt-4' style={{borderRadius:"20px", backgroundColor:"#eee", maxWidth:"700px"}}>
      <Row>
        <Col xs={6} className="text-center m-4">
          <img
            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
            alt='profile'
            style={{
              width:'200px',
              height:'200px',
              borderRadius:'50%',
              objectFit:'cover'
            }}
          />
          
          <h5><b> Nombre:</b> {user.Nombre}</h5>
          <h6><b> Usuario:</b> {user.userName}</h6>
          <h6><b> Email:</b> {user.email}</h6>
          </Col>
          <Col className="text-center m-4">
          
            <h5><b> Rol:</b> {user.role}</h5>
            <h5><b> Password:</b> {user.password}</h5>
            <h5><b> Telefono:</b> {user.telefono}</h5>
            <h5><b> Respuesta:</b> {user.respuesta}</h5>
            
            <input value={user.id} style={{display:'none'}}></input>
              
            <Button variant="success" onClick={openChangePasswordModal} className='m-2' style={{textDecoration:'none'}}>
              Cambiar password
            </Button>
            <Button variant="danger" onClick={openDeleteModal} className="m-5"style={{textDecoration:'none'}}>
              Eliminar cuenta
            </Button>
            <Button as={NavLink} to={routes.login} onClick={logout}>Cerrar Sesion</Button>
            <Button as={NavLink} to={"https://equipounoyseiscommx.com/aspiradora/control.php"} onClick={logout} style={{margin:'10'}}>IOT</Button>
        </Col>
      </Row>
        </Container>
        <DeleteModal
            isOpen={isOpenDeleteModal}
            close = {closeDeleteModal}
            id = {user.id}
        />
        <ChangePasswordModal
            isOpen={isOpenChangePasswordModal}
            close = {closeChangePasswordModal}
            id = {user.id}

        />
        
      </>
  )
}
