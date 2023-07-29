import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TopNavbar from '../Nav/TopNavbar';


export default function Agentes() {

    const [agentes,setAgentes]= useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [adminCode, setAdminCode] = useState('');

    const {id} = useParams()

    useEffect(()=>{
        loadAgentes();
        
    },[])

    const loadAgentes=async()=>{
        const result= await axios.get("http://localhost:8080/agentes")
        setAgentes(result.data)
    }

    const deleteAgente=async(id)=>{
        if (window.confirm("¿Estás seguro de que deseas eliminar este agente?")){
         await axios.delete(`http://localhost:8080/agente/${id}`)
        alert("Agente eliminado exitosamente.")
        loadAgentes()
    }}

    const toggleShowPassword = () => {
        if (adminCode === 'as2468123') {
          setShowPassword(!showPassword);
        } else {
          alert('Código de administrador incorrecto');
        }
    };

  return (
<>
<div className='top-navbar'><TopNavbar position="fixed"/></div>

<div className="d-flex justify-content-center " style={{  padding: '20px'  }}>
      <div className="card bg-white p-4 shadow-sm rounded-3" style={{ width: '1090px' }}>
        <MDBTable className="table  align-middle">
      <MDBTableHead>
        <tr>
          <th scope="col"style={{ color: 'blue', fontWeight: 'bold' }}>#</th>
          <th scope='col'style={{ color: 'blue', fontWeight: 'bold' }}>Nombre </th>
          <th scope='col'style={{ color: 'blue', fontWeight: 'bold' }}>Usuario</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Correo</th>
          <th scope='col' style={{ color: 'blue', fontWeight: 'bold' }}>Contraseña</th>
          <th scope="col"style={{ color: 'blue', fontWeight: 'bold' }}>Acciones 
          &nbsp; &nbsp;&nbsp;&nbsp;<Link to='/addagente'><MDBBtn color="blue" rounded size="sm" style={{ color: 'white', fontWeight: 'bold' }}>
              Agregar
          </MDBBtn></Link></th>
        </tr>
      </MDBTableHead>

      <MDBTableBody>
        {
            agentes.map((agente,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
          <td>
            {agente.nombre}
          </td>
          <td>
            {agente.username}    
          </td>
          <td>{agente.correo}</td>
          {/* <td>{agente.password}</td> */}
          <td>{showPassword || adminCode === 'as2468123' ? agente.password : '********'}</td>
          <td>
          <Link to={`/editagente/${agente.id_agente}`}>
            <MDBBtn color="success" rounded size="sm">
                Editar
            </MDBBtn>
         </Link>
          <MDBBtn color="danger" rounded size="sm" onClick={() => deleteAgente(agente.id_agente)}>
              Eliminar
          </MDBBtn>
            </td>
        </tr>
        ))
    }
      </MDBTableBody>
    </MDBTable>
    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            <input
              type='password'
              placeholder='Código de administrador'
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <MDBBtn color='primary' rounded onClick={toggleShowPassword}>
              Mostrar Contraseña
            </MDBBtn>
          </div>
    </div>
    </div>
    <style>
    {`
    .top-navbar {
      position: static;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      /* Add any additional styles you need for your navbar */`}
    </style>


</>
  )
}
