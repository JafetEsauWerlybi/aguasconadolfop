import React, { useState, useEffect } from 'react';
import useModal from '../hooks/useModal';
import ChangePasswordModal from './ChangeAccountAdmin';
import DeleteModalAdmin from './DeleteModalAdmin';


function UserList() {
  const [users, setUsers] = useState([]);
  const [Id, setId] = useState('');
  const [Nombre, setNombre]= useState('');
  const [Email, setEmail]= useState('');
  const [Telefono, setTelefono]= useState('');
  const [Password, setPassword]= useState('');
  const [Respuesta, setRespuesta]= useState('');
  const [UserName, setUserName]= useState('');
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenChangePasswordModal, openChangePasswordModal, closeChangePasswordModal] = useModal();

  

  function getUserDetails(id) {
    fetch(`https://node-vercel-ahor.vercel.app/api/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setId(data._id);
        
        openDeleteModal()
      });
  }
  function getUserDetailsForEdit(id) {
    fetch(`https://node-vercel-ahor.vercel.app/api/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setId(data._id);
        setNombre(data.name);
        setUserName(data.userName);
        setEmail(data.email);
        setPassword(data.password);
        setTelefono(data.tel);
        setRespuesta(data.respuesta);
        openChangePasswordModal()
      });
  }


useEffect(() => {
  async function fetchData() {
    fetch('https://node-vercel-ahor.vercel.app/api/usersR')
      .then(response => response.json())
      .then(data => setUsers(data));
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
            
            <h1>Usuarios admin</h1>
            <div class="container__info">  
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
    <ul className='container md-10'>
    {users.map(user => (
      
      <div className='container text-center mt-5' style={{borderRadius:"20px", backgroundColor:"#eee", maxWidth:"700px"}}>
          <div className='row'>
          <div className='col text-center m-4'>
          <img
          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
            alt='profile'
            style={{
              maxWidth:'100px',
              maxHeight:'100px',
              borderRadius:'50%',
              objectFit:'cover'
            }}
            />
            <h6><b>Id: </b>{(user._id)}</h6>
            <h6><b>Nombre: </b>{user.name} </h6>
            <h6><b>Email: </b>{user.email}</h6>
            </div>
            <div className='col text-center m-4'>
            <h6><b>Usuario: </b>{(user.userName)}</h6>
          <h6><b>Password: </b>{(user.password)}</h6> 
          <h6><b>Telefono: </b>{user.tel}</h6>
          <h6><b>Respuesta a pregunta secreta: </b>{user.respuesta}</h6>
          <h6><b>Rol: </b>{user.rol[0].rol}</h6>
            
          <button className='btn btn-warning btn-sm btn-block m-3' onClick={() => getUserDetailsForEdit(user._id)}>Editar usuario</button>
          <button className='btn btn-danger btn-sm btn-block m-3'onClick={() => getUserDetails(user._id)}>Eliminar usuario</button>
          </div>
          </div>
        </div>
        
      ))}
      <DeleteModalAdmin
            isOpen={isOpenDeleteModal}
            close = {closeDeleteModal}
            id = {Id}
            />
            <ChangePasswordModal
            isOpen={isOpenChangePasswordModal}
            close = {closeChangePasswordModal}
            id = {Id}
            Nombre ={Nombre}
            UserName ={UserName}
            Email ={Email}
            Password ={Password}
            Telefono ={Telefono}
            Respuesta ={Respuesta}
            />
            </ul>
            </>
  );
}

export default UserList;