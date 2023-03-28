import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import routes from './helpers/routes';
import swal from 'sweetalert';


export default function Register() {
    const [Nombre, setNombre]= useState('');
    const [Email, setEmail]= useState('');
    const [Telefono, setTelefono]= useState('');
    const [Password, setPassword]= useState('');
    const [paswor, setPaswor]= useState('');
    const [Respuesta, setRespuesta]= useState('');
    const [UserName, setUserName]= useState('');
    
    const tele = parseInt(Telefono);
    const resetForm=()=>{
      setNombre('');
      setEmail('');
      setTelefono('');
      setPassword('');
      setPaswor('');
      setRespuesta('');
      setUserName('');
      <Navigate to={routes.login}/>
      swal('Listo','Usuario registrado', 'success');
    }
    const agregarUsuario =()=>{
      if(Nombre===''||Email===''||Telefono===''||Respuesta===''||Password===''||UserName===''||Password.length>8||Telefono.length<10){
        swal('error','Llena todos los campos', 'error');
      }
      else{
        if(Password === paswor){
          resetForm();
        const requestData = {
          name: Nombre,
          userName:UserName,
          email : Email,
          password: Password,
          respuesta: Respuesta,
          tel: tele,
          rol:'641bbb2ac57db8edc23dc7ae'
        };
        axios.post('https://node-vercel-ahor.vercel.app/api/users', requestData)
          .then(response => console.log(response.data))
          .catch(error => console.error(error));
          
        }
        else{
          swal("ERROR","Las password no coinciden","error")
        }
      }
    }
    
    
const verificarCorreo = async () => {  
    try{
      const envia =  await fetch('https://node-vercel-ahor.vercel.app/api/users/correoExistente',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:Email
          })
        })
      const data = await envia.json()
      if(data.message==='Este correo no existe'){
        agregarUsuario();
        
      }else{
        swal('Error', 'Correo ya registrado', 'error')
      }
    
    }catch (error){
      console.error(error)
    }
  }

  return (
  <>
  <div class="container_all" id="container__all">
        <div class="cover">

            <div class="bg_color"></div>
            <div class="wave w1"></div>
            <div class="wave w1"></div>
            
            <div class="container__cover">
            <h1>Registrarse a la pagina</h1>
            <div class="container__info">  
                
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
  <section className="vh-80" style={{width:'100%',marginTop:'-100px'}}>
  <div className=" py-5 h-20" style={{width:'100%'}}>
    <div className="row d-flex justify-content-center align-items-center h-20" style={{width:'100%'}}>
      <div className="col col-xl-10">
        <div className="" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-8 col-lg-7 d-none d-md-block justify-content-center">
              <img src="https://media.tenor.com/jABc5YMfBMcAAAAC/hola-buenos.gif"
                alt="login form" style={{borderRadius: "1rem 0 0 1rem", width:'650px'}} />
            </div>
            
            <div className="col-md-6 col-lg-5 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

              
              <span className="h1 fw-bold">Registrarse</span><br></br><br></br>
              
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" name='nombre' id='nombre' className="form-control" value={Nombre} onChange={(e)=> {setNombre(e.target.value)}}
              required
              ></input>
                
              <label htmlFor="UserName" className="form-label">Nombre de Usuario</label>
              <input type="text" name='UserName' id='UserName' className="form-control" value={UserName} onChange={(e)=> {setUserName(e.target.value)}}
              required
              ></input>
              
              
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" name='email' id='email' className="form-control" value={Email} onChange={(e)=> {setEmail(e.target.value)}} required></input>
              
              
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={Password} onChange={(e)=> {setPassword(e.target.value)}}
              required></input>
              
              <label htmlFor="password" className="form-label">Repite la Contraseña</label>
              <input type="password" className="form-control" value={paswor} onChange={(e)=> {setPaswor(e.target.value)}}></input>
              
              
                <label htmlFor="respuesta" className="form-label">¿Nombre de tu mascota?</label>
                <input type="text" name='respuesta' id='respuesta' className="form-control" value={Respuesta} onChange={(e)=> {setRespuesta(e.target.value)}}required></input>

                
                <label htmlFor="telefono" className="form-label">Telefono</label>
                <input type="number" className="form-control" value={Telefono} onChange={(e)=> {setTelefono(e.target.value)}}required></input>
                
                <button onClick={verificarCorreo} className="btn btn-dark btn-lg btn-block mt-3">Regitrarse</button>
            
                      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>


</>
        
)
}
