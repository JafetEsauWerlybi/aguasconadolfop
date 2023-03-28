import React, { useEffect, useState } from 'react'

export default function Registro() {
  const [Registros, setRegistros] = useState([]);
  useEffect(() => {
    fetch('https://node-vercel-ahor.vercel.app/api/sesion')
      .then(response => response.json())
      .then(data => setRegistros(data));
  }, []);

  return (
    <>
    <div class="container_all" id="container__all">
        <div class="cover">

            <div class="bg_color"></div>
            <div class="wave w1"></div>
            <div class="wave w1"></div>
            
            <div class="container__cover">
            <h1>Registros de sesiones</h1>
            <div class="container__info">  
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
    <div className='container text-center'>
    <table class="table table table-striped" style={{borderRadius:'20px'}}>
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Usuario</th>
        <th scope="col">Email</th>
        <th scope="col">Telefono</th>
        <th scope="col">Fecha</th>
        </tr>
        </thead>
        
        {Registros.map(Registro => (
          <tbody style={{backgroundColor:'rgba(244, 250, 254)'}}>
          <tr>
          <td>{Registro._id}</td>
          <td>{Registro.usuario[0].name}</td>
      <td>{Registro.usuario[0].email}</td>
      <td>{Registro.usuario[0].userName}</td>
      <td>{Registro.usuario[0].tel}</td>
      <td>{Registro.fecha}</td>
      
      </tr>
      </tbody>
      ))}
      </table>
      </div>
      
      </>
      )
}
