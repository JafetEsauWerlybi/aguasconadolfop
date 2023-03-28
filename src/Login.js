import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from './auth/useAuth'
import useModal from './hooks/useModal';
import ForgetPasswordModal from './modalesHelp/ForgetPassword';
  
export default function Login() {
  const [isOpenForgetPasswordModal, openForgetPasswordModal, closeForgetPasswordModal] = useModal();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [VPassword, setVPassword] = useState('password');
  
  const verPass =()=>setVPassword('text')
  const ocultar =()=>setVPassword('password')
  const location = useLocation();
  const {login} = useAuth();
  
  const registrarLogin =(id)=>{
      axios.post('https://node-vercel-ahor.vercel.app/api/sesion/', id)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
        
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
        swal('Error', 'Este correo no existe', 'error')
      }else{
        openForgetPasswordModal();
      }
    
    }catch (error){
      console.error(error)
    }
  }

  const verficarDatos=async()=>{
    if(Email==='' || Password===''){
      swal('Error', 'Rellena los campos papu', 'error')
    }else{
      try{
        const envia =  await fetch('https://node-vercel-ahor.vercel.app/api/users/verificar',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email:Email,
              password:Password
            })
          })
        const data = await envia.json()
        if(data.message==='Correo o contraseña incorrectas,verifique'){
          swal('Error el los campos', 'Si olvidaste tu contraseña ntp rellena el campo de Correo con tu correo y da click en olvide contraseña)','error')
        }else{
          //console.log(data);
          if(data.rol === '641bbbdec57db8edc23dc7b0'){
            data.rol= "admin"
          }
          else{swal('Listo', 'usuario encontrado'+ data.rol, 'success');
          data.rol='Usuario Normal'}
          login(data.name,data.email,data.userName, data.tel, data.password, data._id, data.rol, data.respuesta, location.state?.from);
          const id={usuario:data._id}
          registrarLogin(id);
        }
      
      }catch (error){
        console.error(error)
      }
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
            <h1>Login/Inicio de sesion</h1>
            <div class="container__info">  
                
            </div>
            <div class="container__vector">
            </div>
            </div>
            </div>
            </div>
    <section className="vh-90" style={{marginTop:'-150px'}}>
    
  
  <div className="container py-5 h-50">
    <div className="col d-flex justify-content-center align-items-center h-50">
      <div className="col col-xl-10">
        <div className="" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6">
              <img src="https://i.gifer.com/origin/3f/3f1d28bba304699e058d3e3230ce87ad.gif"
              alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            
            <div className="col-md-6 col-lg-6 d-flex align-items-center">
            <div className="card-body p-4 p-lg-5 text-black">
            
            
            <div className="d-flex align-items-center mb-3 pb-1">
            <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
            <span className="h1 fw-bold mb-0">Login</span>
            </div>
            
                  <h5 className="fw-normal mb-3 pb-3" >Inicia sesion con tu correo y contraseña:D</h5>
                  <h5 className="fw-normal mb-3 pb-3" >Sing In with u Email and Password:D</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg"  value={Email}  onChange={(e)=> {setEmail(e.target.value)}}/>
                    <label className="form-label" htmlFor="form2Example17">Coreo/Email</label>
                    
                    </div>
                    
                    <div className="form-outline mb-4">

                    <div className='form-control form-control-lg'>
                    <input type={VPassword} id="form2Example27" style={{borderWidth:'0', padding:'9px', margin:'-15px', width:'80%'}} value={Password} onChange={(e)=> {setPassword(e.target.value)}}/>
                    <button  className="btn btn-dark btn-sm btn-block" onClick={verPass}>👁</button>
                    <button  className="btn btn-dark btn-sm btn-block" onClick={ocultar} style={{marginLeft:'6px'}} >🙈</button>
                    </div>
                    <label className="form-label" htmlFor="form2Example27">Password/Contraseña</label>
                    
                  </div>
                  
                  
                    <button onClick={verficarDatos} className="btn btn-dark btn-md btn-block">Iniciar sesión</button>
                    <button  className="btn btn-dark btn-md btn-block m-1" onClick={verificarCorreo}>Olvide la contraseña</button>
                  
                    
              </div>
              </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</section>
<ForgetPasswordModal
            isOpen={isOpenForgetPasswordModal}
            close = {closeForgetPasswordModal}
            Email={Email}
            
        />

    
</>
  )
}
