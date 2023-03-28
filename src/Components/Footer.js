import React from 'react'

export default function Footer() {
  return (
    <footer >

            <div class="container__footer">

                <div class="box__footer">
                    <h3>Soluciones</h3>
                    <p href="#">App Desarrollo</p>
                    <p href="#">App Marketing</p>
                    <p href="#">IOS Desarrollo</p>
                    <p href="#">Android Desarrollo</p>
                </div>

                <div class="box__footer">
                    <h2>Compañia</h2>
                    
                    
                    <p href="#">Aguas con Adolfo</p>
                    <p href="#">BLAS</p>              
                </div>

                <div class="box__footer">
                    <h2>Redes Sociales</h2>
                    <p href="#"><i class="fab fa-facebook-square"></i> Facebook</p>
                    <p href="#"><i class="fab fa-twitter-square"></i> Twitter</p>
                    <p href="#"><i class="fab fa-linkedin"></i> Linkedin</p>
                    <p   href="#"><i class="fab fa-instagram-square"></i> Instagram</p>
                </div>
            </div>

            <div class="box__copyright">
                <hr></hr>
                <p>Todos los derechos reservados © 2023 <b>Aguas Con Adolfo</b></p>
            </div>
        </footer>
  )
}

