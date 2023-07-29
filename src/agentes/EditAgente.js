import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'


export default function EditAgente() {

    let navigate = useNavigate()
    const {id}=useParams()
    console.log(id)

    const [agente,setAgente]=useState({
        nombre:"",
        username:"",
        correo:"",
        password:""
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {nombre,username,correo,password}=agente;

    const onInputChange=(e)=>{
        setAgente({...agente,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        loadAgentes();
    },[])
    
    const loadAgentes=async()=>{
        const result= await axios.get(`http://localhost:8080/agente/${id}`)
        setAgente(result.data)
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        if (!nombre || !username || !correo || !password || !confirmPassword) {
            alert("Por favor, complete todos los campos");
            return;
        }
        if (password !== confirmPassword) {
            alert('La contraseña y la confirmación de la contraseña no coinciden');
            return;
        }
        await axios.put(`http://localhost:8080/agente/${id}`,agente)
        alert("Agente Actualizado!")
        navigate("/agentes")
    }
  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'> 
            <h2 className='text-center m-4'>Editar Agente</h2>
            <form onSubmit={e=>onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Nombre' className='form-label'>Nombre</label>
                    <input
                        type= {"text"}
                        className='form-control' 
                        placeholder='Ingrese el Nombre'
                        name='nombre'
                        value={nombre}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Usuario' className='form-label'>Usuario</label>
                    <input
                        type= {"text"}
                        className='form-control' 
                        placeholder='Ingrese el Usuario'
                        name='username'
                        value={username}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Correo' className='form-label'>Correo</label>
                    <input
                        type= {"text"}
                        className='form-control' 
                        placeholder='Ingrese el Correo'
                        name='correo'
                        value={correo}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='Contraseña' className='form-label'>Contraseña</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Ingrese la Contraseña'
                  name='password'
                  value={password}
                  onChange={(e) => onInputChange(e)}
                />
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  onClick={toggleShowPassword}
                >
                  Mostrar
                </button>
                </div>
                
                <div className='mb-3'>
              <label htmlFor='ConfirmarContraseña' className='form-label'>Confirmar Contraseña</label>
              <input
                type={'password'}
                className='form-control'
                placeholder='Confirme la Contraseña'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e)}
              />
            </div>
                <button type='submit' className='btn btn-outline-primary'>Aceptar</button>
                <Link type='submit' className='btn btn-outline-danger mx-2' to="/agentes">Cancelar</Link>
            </form>
        </div>
    </div>
</div>
  )
}
