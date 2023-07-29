import React, { useState } from 'react';
import axios from 'axios';
import {  MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput } from 'mdb-react-ui-kit';
import './Login.css';
import loginImage from '../images/login-image.png';
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    let navigate  = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = () => {
      const loginData = {
        username: username,
        password: password
      };
  
      axios
        .post('http://localhost:8080/login', loginData)
        .then(response => {
          console.log(response.data)
          if (response.data === 'home') {
            // Si el resultado es 'login', redirecciona a la página de inicio
            navigate('/home');
          } else {
            // Si el resultado no es 'login', muestra una alerta de contraseña incorrecta
            alert('Usuario y Contraseña incorrecta');
          }
        })
        .catch(error => {
          // Manejar errores de conexión u otros errores del servidor
          console.error('Error:', error);
        });
    };

    // const handleLogin = () => {
    //     const loginData = {
    //       username: username,
    //       password: password
    //     };
    //     axios.post('http://localhost:8080/login', loginData)
    //     navigate("/home")
      // .then(response => {
      //   // Aquí puedes manejar la respuesta exitosa, por ejemplo, almacenar el token en el estado de tu aplicación
      //   // const token = response.data;
      //   navigate("/home")
      //   console.log(response.data)
      //   navigate("/home")
      //   // Realizar acciones adicionales, como redireccionar a otra página
      // })
      // .catch(error => {
      //   // Aquí puedes manejar el error de autenticación, por ejemplo, mostrar un mensaje de error al usuario
      //   console.error('Error de autenticación:', error);
      // });
    // };

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src={loginImage} alt="login form" className='w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="globe-africa" style={{ color: '#ff6219', fontSize: '2rem', padding: '5px'}}/>
                {/* <span className="h1 fw-bold mb-0">Lets Travel</span> */}
                <h4 className="mt-1 mb-5 pb-1 ">Lets Travel</h4>
              </div>

              <h5 className="fw-bold my-4 pb-3" style={{letterSpacing: '1px'}}></h5>

                <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg"  value={username} onChange={e => setUsername(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Contraseña' id='formControlLg' type='password' size="lg" value={password} onChange={e => setPassword(e.target.value)}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleLogin}>Iniciar Sesion</MDBBtn>
              {/*<a className="small text-muted" href="#!">¿Olvidaste la Contraseña?</a>
              {/* <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p> */}



            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}