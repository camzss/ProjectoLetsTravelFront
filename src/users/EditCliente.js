import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'

export default function EditCliente() {
    let navigate = useNavigate()

    const {id}=useParams()

    const [cliente,setCliente]=useState({
        nombre:"",
        correo:"",
        telefono:""
    })
    const {nombre,correo,telefono}=cliente

    const onInputChange=(e)=>{

        setCliente({...cliente,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        loadClientes();
        
    },[])

    

    const onSubmit=async (e)=>{
        e.preventDefault();
        if (!nombre || !correo || !telefono) {
          alert("Por favor, complete todos los campos");
          return;
        }
        await axios.put(`http://localhost:8080/cliente/${id}`,cliente)
        alert("Cliente Actualizado!")
        navigate("/clientes")
    }

    const loadClientes=async()=>{
        const result= await axios.get(`http://localhost:8080/cliente/${id}`)
        setCliente(result.data)
    }

  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'> 
            <h2 className='text-center m-4'>Editar Cliente</h2>
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
                    <label htmlFor='Telefono' className='form-label'>Telefono</label>
                    <input
                        type= {"text"}
                        className='form-control' 
                        placeholder='Ingrese N° de Telefono'
                        name='telefono'
                        value={telefono}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-outline-primary'>Aceptar</button>
                <Link type='submit' className='btn btn-outline-danger mx-2' to="/clientes">Cancelar</Link>
            </form>
        </div>
    </div>
</div>
  )
}
