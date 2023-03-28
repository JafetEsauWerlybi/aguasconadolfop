import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import routes from './helpers/routes'

export default function Home() {
  return (
    <>
    <div class="container_all" id="container__all">
        <div class="cover">

            <div class="bg_color"></div>
            <div class="wave w1"></div>
            <div class="wave w1"></div>
            
            <div class="container__cover">
            <h1 style={{fontSize:'50px'}}>Aguas con Adolfo</h1>
            <div class="container__info">  
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
    <div className="position-relative p-3 p-md-5 m-md-3 text-center" style={{backgroundImage:"linear-gradient(to bottom,rgba(255, 255, 255, 0.5),rgba(200, 200, 255, 0.5)), url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDRjNDU0YTE4MjIzMjQwMTdhYTEwM2U0YmNhNDkxMjEyYTJkMDgzMiZjdD1n/Pz4SgTdHt0WgjhltWL/giphy.gif"}}>
    <div className="col-md-5 p-lg-5 mx-auto my-5">
    <h1 className="display-1 font-weight-bold">Bienvenido a Aguas con Adolfo</h1>
    <h4>¿Quieres disfrutar de aguas sumamente deliciosas?, entonces esta pagina es para ti</h4>
    <Button as={Link} to={routes.login}>Logeate papu</Button> o <Button as={Link} to={routes.register}>Registrate papu</Button>
    </div>
    <div className="product-device box-shadow d-none d-md-block"></div>
    <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
    </div>
    
    </>
  )
}
