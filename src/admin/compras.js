import React, { useEffect, useState } from 'react'

export default function Compras() {
  const [Compras, setCompras] = useState([]);
  useEffect(() => {
    fetch('https://node-vercel-ahor.vercel.app/api/venta')
      .then(response => response.json())
      .then(data => setCompras(data));
  }, []);
  return (
    <>
    <div class="container_all" id="container__all">
        <div class="cover">

            <div class="bg_color"></div>
            <div class="wave w1"></div>
            <div class="wave w1"></div>
            
            <div class="container__cover">
            <h1>Admin compras</h1>
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
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Cantidad vendida</th>
        <th scope="col">Total de compra</th>
        <th scope="col">Fecha</th>
        </tr>
        </thead>
        
        {Compras.map(Compras => (
          <tbody style={{backgroundColor:'rgba(244, 250, 254)'}}>
          <tr>
          <td>{Compras.Producto[0].nombre}</td>
          <td>{Compras.Producto[0].precio}</td>
      <td>{Compras.Producto[0].Descripcion}</td>
      <td>{Compras.detalle.cantidad}</td>
      <td>{Compras.detalle.total}</td>
      <td>{Compras.fecha}</td>
      
      </tr>
      </tbody>
      ))}
      </table>
      </div>
      
      </>
      )
}
